#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime, timedelta
from typing import Dict, Any

class BudgetPredictorAPITester:
    def __init__(self, base_url="https://budget-predictor.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, 
                 data: Dict = None, headers: Dict = None) -> tuple:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            response_data = None
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text[:500]}

            details = f"Status: {response.status_code} (expected {expected_status})"
            if not success:
                details += f", Response: {response.text[:200]}"

            self.log_test(name, success, details, response_data)
            return success, response_data

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {"error": str(e)}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test GET status (should return empty list initially)
        success1, _ = self.run_test("Get Status Checks", "GET", "status", 200)
        
        # Test POST status
        test_data = {"client_name": "test_client_api"}
        success2, response = self.run_test("Create Status Check", "POST", "status", 200, test_data)
        
        return success1 and success2

    def test_model_training(self):
        """Test model training endpoint"""
        return self.run_test("Train Models", "GET", "train-models", 200)

    def test_travel_prediction_basic(self):
        """Test basic travel prediction"""
        prediction_data = {
            "from_location": "New York, NY",
            "to_location": "Los Angeles, CA",
            "travel_date": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
            "return_date": (datetime.now() + timedelta(days=37)).strftime("%Y-%m-%d"),
            "num_travelers": 2,
            "budget_category": "mid-range",
            "travel_types": ["flight", "road_trip", "general"]
        }
        
        return self.run_test("Basic Travel Prediction", "POST", "predict-travel-budget", 200, prediction_data)

    def test_travel_prediction_international(self):
        """Test international travel prediction"""
        prediction_data = {
            "from_location": "New York, NY",
            "to_location": "London, UK",
            "travel_date": (datetime.now() + timedelta(days=60)).strftime("%Y-%m-%d"),
            "num_travelers": 1,
            "budget_category": "luxury",
            "travel_types": ["flight", "general"]
        }
        
        return self.run_test("International Travel Prediction", "POST", "predict-travel-budget", 200, prediction_data)

    def test_travel_prediction_economy(self):
        """Test economy budget prediction"""
        prediction_data = {
            "from_location": "Chicago, IL",
            "to_location": "Miami, FL",
            "travel_date": (datetime.now() + timedelta(days=15)).strftime("%Y-%m-%d"),
            "num_travelers": 4,
            "budget_category": "economy",
            "travel_types": ["road_trip"]
        }
        
        return self.run_test("Economy Budget Prediction", "POST", "predict-travel-budget", 200, prediction_data)

    def test_travel_prediction_single_type(self):
        """Test prediction with single travel type"""
        prediction_data = {
            "from_location": "San Francisco, CA",
            "to_location": "Seattle, WA",
            "travel_date": (datetime.now() + timedelta(days=45)).strftime("%Y-%m-%d"),
            "num_travelers": 1,
            "budget_category": "mid-range",
            "travel_types": ["flight"]
        }
        
        return self.run_test("Single Travel Type Prediction", "POST", "predict-travel-budget", 200, prediction_data)

    def test_prediction_history(self):
        """Test prediction history endpoint"""
        return self.run_test("Get Prediction History", "GET", "prediction-history", 200)

    def test_invalid_locations(self):
        """Test prediction with invalid locations"""
        prediction_data = {
            "from_location": "InvalidCity123",
            "to_location": "AnotherInvalidCity456",
            "travel_date": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
            "num_travelers": 1,
            "budget_category": "mid-range",
            "travel_types": ["flight"]
        }
        
        # This should fail with 400 or 500 status
        success, response = self.run_test("Invalid Locations", "POST", "predict-travel-budget", 500, prediction_data)
        # We expect this to fail, so if it returns 400 or 500, that's correct behavior
        if not success and response and "error" in str(response).lower():
            self.log_test("Invalid Locations Error Handling", True, "Correctly handled invalid locations")
            return True
        return success

    def test_missing_required_fields(self):
        """Test prediction with missing required fields"""
        prediction_data = {
            "from_location": "New York, NY",
            # Missing to_location
            "travel_date": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
            "num_travelers": 1,
            "budget_category": "mid-range",
            "travel_types": ["flight"]
        }
        
        # This should fail with 422 (validation error)
        success, response = self.run_test("Missing Required Fields", "POST", "predict-travel-budget", 422, prediction_data)
        return success

    def validate_prediction_response(self, response_data: Dict) -> bool:
        """Validate the structure of a prediction response"""
        if not response_data:
            return False
            
        required_fields = [
            "id", "request_data", "from_coordinates", "to_coordinates", 
            "distance_km", "predictions", "timestamp"
        ]
        
        for field in required_fields:
            if field not in response_data:
                print(f"Missing required field: {field}")
                return False
        
        # Validate predictions structure
        if not isinstance(response_data["predictions"], list):
            print("Predictions should be a list")
            return False
            
        for prediction in response_data["predictions"]:
            pred_fields = ["travel_type", "predicted_cost", "cost_breakdown", "confidence_score"]
            for field in pred_fields:
                if field not in prediction:
                    print(f"Missing prediction field: {field}")
                    return False
                    
            # Validate cost is positive
            if prediction["predicted_cost"] <= 0:
                print(f"Invalid cost: {prediction['predicted_cost']}")
                return False
                
            # Validate confidence score is between 0 and 1
            if not (0 <= prediction["confidence_score"] <= 1):
                print(f"Invalid confidence score: {prediction['confidence_score']}")
                return False
        
        return True

    def run_comprehensive_test(self):
        """Run all tests"""
        print("🚀 Starting Budget Predictor API Tests")
        print("=" * 50)
        
        # Basic connectivity tests
        print("📡 Testing Basic Connectivity...")
        self.test_root_endpoint()
        
        # Status endpoints
        print("📊 Testing Status Endpoints...")
        self.test_status_endpoints()
        
        # Model training
        print("🤖 Testing Model Training...")
        self.test_model_training()
        
        # Core prediction functionality
        print("🎯 Testing Core Prediction Functionality...")
        success, response = self.test_travel_prediction_basic()
        if success and response:
            validation_success = self.validate_prediction_response(response)
            self.log_test("Basic Prediction Response Validation", validation_success, 
                         "Response structure validation")
        
        # Different scenarios
        print("🌍 Testing Different Travel Scenarios...")
        self.test_travel_prediction_international()
        self.test_travel_prediction_economy()
        self.test_travel_prediction_single_type()
        
        # History endpoint
        print("📚 Testing History Endpoint...")
        self.test_prediction_history()
        
        # Error handling
        print("⚠️ Testing Error Handling...")
        self.test_invalid_locations()
        self.test_missing_required_fields()
        
        # Print summary
        print("=" * 50)
        print(f"📈 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! API is working correctly.")
            return 0
        else:
            print("❌ Some tests failed. Check the details above.")
            return 1

def main():
    tester = BudgetPredictorAPITester()
    return tester.run_comprehensive_test()

if __name__ == "__main__":
    sys.exit(main())