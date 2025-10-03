from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import math
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize geocoder
geolocator = Nominatim(user_agent="budget_predictor")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class TravelPredictionRequest(BaseModel):
    from_location: str
    to_location: str
    travel_date: str  # YYYY-MM-DD format
    return_date: Optional[str] = None  # YYYY-MM-DD format
    num_travelers: int = 1
    budget_category: str = "mid-range"  # economy, mid-range, luxury
    travel_types: List[str] = ["flight", "road_trip", "general"]  # Which predictions to include

class LocationCoordinates(BaseModel):
    latitude: float
    longitude: float
    formatted_address: str

class TravelPrediction(BaseModel):
    travel_type: str
    predicted_cost: float
    cost_breakdown: Dict[str, float]
    confidence_score: float

class TravelPredictionResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    request_data: TravelPredictionRequest
    from_coordinates: LocationCoordinates
    to_coordinates: LocationCoordinates
    distance_km: float
    predictions: List[TravelPrediction]
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ML Model Manager Class
class BudgetPredictorML:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.is_trained = False
        
    def geocode_location(self, location: str) -> LocationCoordinates:
        """Geocode a location string to coordinates"""
        try:
            geo_result = geolocator.geocode(location)
            if geo_result:
                return LocationCoordinates(
                    latitude=geo_result.latitude,
                    longitude=geo_result.longitude,
                    formatted_address=geo_result.address
                )
            else:
                raise ValueError(f"Could not geocode location: {location}")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Geocoding error: {str(e)}")
    
    def calculate_distance(self, from_coords: LocationCoordinates, to_coords: LocationCoordinates) -> float:
        """Calculate distance between two coordinates in kilometers"""
        from_point = (from_coords.latitude, from_coords.longitude)
        to_point = (to_coords.latitude, to_coords.longitude)
        return geodesic(from_point, to_point).kilometers
    
    def generate_training_data(self, n_samples: int = 5000) -> pd.DataFrame:
        """Generate realistic training data for travel costs"""
        np.random.seed(42)
        
        data = []
        
        # Popular destinations with different cost levels
        destinations = [
            ("New York", "expensive", 1.5),
            ("Los Angeles", "expensive", 1.4),
            ("London", "expensive", 1.6),
            ("Paris", "expensive", 1.55),
            ("Tokyo", "expensive", 1.65),
            ("Dubai", "expensive", 1.45),
            ("Bangkok", "cheap", 0.6),
            ("Delhi", "cheap", 0.5),
            ("Mexico City", "moderate", 0.8),
            ("Berlin", "moderate", 0.9),
            ("Prague", "moderate", 0.7),
            ("Istanbul", "moderate", 0.75),
            ("Sydney", "expensive", 1.3),
            ("Toronto", "moderate", 1.1),
            ("Amsterdam", "expensive", 1.25),
            ("Barcelona", "moderate", 0.95),
            ("Rome", "moderate", 1.0),
            ("Vienna", "moderate", 1.05),
            ("Budapest", "cheap", 0.65),
            ("Cairo", "cheap", 0.55)
        ]
        
        budget_multipliers = {
            "economy": 0.7,
            "mid-range": 1.0,
            "luxury": 1.8
        }
        
        for i in range(n_samples):
            # Random source and destination
            source_dest = np.random.choice(destinations, 2, replace=False)
            source_info = source_dest[0]
            dest_info = source_dest[1]
            
            # Distance (km) - simulated realistic distances
            distance = np.random.uniform(200, 15000)
            
            # Travel parameters
            num_travelers = np.random.choice([1, 2, 3, 4, 5, 6], p=[0.3, 0.35, 0.2, 0.1, 0.04, 0.01])
            duration = np.random.uniform(1, 14)  # days
            budget_cat = np.random.choice(["economy", "mid-range", "luxury"], p=[0.4, 0.45, 0.15])
            
            # Seasonality factor (1 = off-season, 1.5 = peak season)
            month = np.random.randint(1, 13)
            if month in [6, 7, 8, 12]:  # Summer and December
                seasonality = np.random.uniform(1.2, 1.5)
            elif month in [3, 4, 5, 9, 10]:  # Spring and Fall
                seasonality = np.random.uniform(1.0, 1.2)
            else:  # Winter (non-December)
                seasonality = np.random.uniform(0.8, 1.0)
            
            # Destination cost factor
            dest_cost_factor = dest_info[2]
            source_cost_factor = source_info[2]
            avg_cost_factor = (dest_cost_factor + source_cost_factor) / 2
            
            # Budget multiplier
            budget_mult = budget_multipliers[budget_cat]
            
            # Base costs per kilometer and day
            flight_base_cost_per_km = np.random.uniform(0.08, 0.25)
            road_base_cost_per_km = np.random.uniform(0.15, 0.35)  # includes fuel, tolls, wear
            accommodation_per_day = np.random.uniform(30, 300)
            food_per_day = np.random.uniform(20, 150)
            activities_per_day = np.random.uniform(10, 200)
            
            # Flight cost calculation
            flight_cost = (
                flight_base_cost_per_km * distance * 
                avg_cost_factor * seasonality * budget_mult * num_travelers +
                np.random.uniform(-100, 200)  # noise
            )
            flight_cost = max(50, flight_cost)  # minimum cost
            
            # Road trip cost calculation  
            road_cost = (
                road_base_cost_per_km * distance +
                accommodation_per_day * duration * avg_cost_factor * budget_mult +
                food_per_day * duration * num_travelers * avg_cost_factor * budget_mult +
                np.random.uniform(-200, 300)  # noise
            )
            road_cost = max(100, road_cost)
            
            # General travel cost (flight + accommodation + food + activities)
            general_cost = (
                flight_cost +
                accommodation_per_day * duration * avg_cost_factor * budget_mult +
                food_per_day * duration * num_travelers * avg_cost_factor * budget_mult +
                activities_per_day * duration * num_travelers * avg_cost_factor * budget_mult +
                np.random.uniform(-300, 500)  # noise
            )
            general_cost = max(200, general_cost)
            
            # Create feature vector
            features = {
                'distance_km': distance,
                'num_travelers': num_travelers,
                'duration_days': duration,
                'month': month,
                'seasonality_factor': seasonality,
                'dest_cost_factor': dest_cost_factor,
                'budget_economy': 1 if budget_cat == "economy" else 0,
                'budget_midrange': 1 if budget_cat == "mid-range" else 0,
                'budget_luxury': 1 if budget_cat == "luxury" else 0,
                'flight_cost': flight_cost,
                'road_cost': road_cost,
                'general_cost': general_cost
            }
            
            data.append(features)
        
        return pd.DataFrame(data)
    
    def train_models(self):
        """Train ML models for different travel types"""
        print("Generating training data...")
        df = self.generate_training_data(5000)
        
        # Feature columns
        feature_cols = [
            'distance_km', 'num_travelers', 'duration_days', 'month',
            'seasonality_factor', 'dest_cost_factor', 'budget_economy',
            'budget_midrange', 'budget_luxury'
        ]
        
        X = df[feature_cols]
        
        # Train models for each travel type
        travel_types = ['flight_cost', 'road_cost', 'general_cost']
        
        for travel_type in travel_types:
            print(f"Training model for {travel_type}...")
            
            y = df[travel_type]
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            # Scale features
            scaler = StandardScaler()
            X_train_scaled = scaler.fit_transform(X_train)
            X_test_scaled = scaler.transform(X_test)
            
            # Train Random Forest model
            model = RandomForestRegressor(
                n_estimators=100,
                max_depth=15,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42
            )
            
            model.fit(X_train_scaled, y_train)
            
            # Store model and scaler
            self.models[travel_type] = model
            self.scalers[travel_type] = scaler
            
            # Calculate R² score
            try:
                train_score = model.score(X_train_scaled, y_train)
                test_score = model.score(X_test_scaled, y_test)
                print(f"{travel_type} - Train R²: {train_score:.3f}, Test R²: {test_score:.3f}")
            except Exception as e:
                print(f"Score calculation error for {travel_type}: {str(e)}")
                print(f"{travel_type} model trained successfully")
        
        self.is_trained = True
        print("Model training completed!")
    
    def predict_travel_cost(self, 
                           distance_km: float,
                           num_travelers: int,
                           duration_days: float,
                           month: int,
                           budget_category: str,
                           dest_cost_factor: float = 1.0) -> Dict[str, TravelPrediction]:
        """Make predictions for all travel types"""
        
        if not self.is_trained:
            self.train_models()
        
        # Seasonality calculation
        if month in [6, 7, 8, 12]:
            seasonality = 1.35
        elif month in [3, 4, 5, 9, 10]:
            seasonality = 1.1
        else:
            seasonality = 0.9
        
        # Budget encoding
        budget_economy = 1 if budget_category == "economy" else 0
        budget_midrange = 1 if budget_category == "mid-range" else 0
        budget_luxury = 1 if budget_category == "luxury" else 0
        
        # Create feature vector
        features = np.array([[
            distance_km, num_travelers, duration_days, month,
            seasonality, dest_cost_factor, budget_economy,
            budget_midrange, budget_luxury
        ]])
        
        predictions = {}
        
        # Make predictions for each travel type
        travel_type_mapping = {
            'flight_cost': 'flight',
            'road_cost': 'road_trip', 
            'general_cost': 'general'
        }
        
        for model_name, travel_type in travel_type_mapping.items():
            model = self.models[model_name]
            scaler = self.scalers[model_name]
            
            # Scale features and predict
            features_scaled = scaler.transform(features)
            predicted_cost = model.predict(features_scaled)[0]
            
            # Calculate confidence based on model's performance (use a fixed confidence for now)
            confidence = 0.85
            
            # Create cost breakdown
            if travel_type == 'flight':
                breakdown = {
                    "flight_tickets": predicted_cost * 0.85,
                    "airport_fees": predicted_cost * 0.10,
                    "booking_fees": predicted_cost * 0.05
                }
            elif travel_type == 'road_trip':
                breakdown = {
                    "fuel": predicted_cost * 0.40,
                    "accommodation": predicted_cost * 0.35,
                    "food": predicted_cost * 0.20,
                    "tolls_misc": predicted_cost * 0.05
                }
            else:  # general
                breakdown = {
                    "transportation": predicted_cost * 0.40,
                    "accommodation": predicted_cost * 0.30,
                    "food": predicted_cost * 0.20,
                    "activities": predicted_cost * 0.10
                }
            
            predictions[travel_type] = TravelPrediction(
                travel_type=travel_type,
                predicted_cost=round(predicted_cost, 2),
                cost_breakdown=breakdown,
                confidence_score=round(confidence, 2)
            )
        
        return predictions

# Initialize ML predictor
ml_predictor = BudgetPredictorML()

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Budget Predictor API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/predict-travel-budget", response_model=TravelPredictionResponse)
async def predict_travel_budget(request: TravelPredictionRequest):
    """Predict travel budget for given parameters"""
    try:
        # Geocode locations
        from_coords = ml_predictor.geocode_location(request.from_location)
        to_coords = ml_predictor.geocode_location(request.to_location)
        
        # Calculate distance
        distance_km = ml_predictor.calculate_distance(from_coords, to_coords)
        
        # Parse dates
        travel_date = datetime.strptime(request.travel_date, "%Y-%m-%d")
        duration_days = 1.0  # default for day trip
        
        if request.return_date:
            return_date = datetime.strptime(request.return_date, "%Y-%m-%d")
            duration_days = (return_date - travel_date).days + 1
        
        # Estimate destination cost factor (simplified)
        # In a real app, this could be based on a database of destination costs
        dest_cost_factor = 1.0
        if distance_km > 5000:  # International travel
            dest_cost_factor = 1.3
        elif distance_km > 1000:  # Long domestic travel
            dest_cost_factor = 1.1
        
        # Get predictions
        all_predictions = ml_predictor.predict_travel_cost(
            distance_km=distance_km,
            num_travelers=request.num_travelers,
            duration_days=duration_days,
            month=travel_date.month,
            budget_category=request.budget_category,
            dest_cost_factor=dest_cost_factor
        )
        
        # Filter predictions based on requested travel types
        filtered_predictions = [
            all_predictions[travel_type] 
            for travel_type in request.travel_types 
            if travel_type in all_predictions
        ]
        
        # Create response
        response = TravelPredictionResponse(
            request_data=request,
            from_coordinates=from_coords,
            to_coordinates=to_coords,
            distance_km=round(distance_km, 2),
            predictions=filtered_predictions
        )
        
        # Store prediction in database
        await db.travel_predictions.insert_one(response.dict())
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@api_router.get("/train-models")
async def train_models_endpoint():
    """Manually trigger model training"""
    try:
        ml_predictor.train_models()
        return {"message": "Models trained successfully", "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training error: {str(e)}")

@api_router.get("/prediction-history", response_model=List[TravelPredictionResponse])
async def get_prediction_history():
    """Get recent travel predictions"""
    predictions = await db.travel_predictions.find().sort("timestamp", -1).limit(50).to_list(50)
    return [TravelPredictionResponse(**pred) for pred in predictions]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()