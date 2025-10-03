import React, { useState, useEffect } from 'react';
import "@/App.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, DollarSign, Users, Plane, Car, Globe, TrendingUp, Clock } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [formData, setFormData] = useState({
    from_location: '',
    to_location: '',
    travel_date: new Date(),
    return_date: null,
    num_travelers: 1,
    budget_category: 'mid-range',
    travel_types: ['flight', 'road_trip', 'general']
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTravelTypeToggle = (travelType) => {
    setFormData(prev => ({
      ...prev,
      travel_types: prev.travel_types.includes(travelType)
        ? prev.travel_types.filter(t => t !== travelType)
        : [...prev.travel_types, travelType]
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getTravelTypeIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'road_trip': return <Car className="h-5 w-5" />;
      case 'general': return <Globe className="h-5 w-5" />;
      default: return <DollarSign className="h-5 w-5" />;
    }
  };

  const getTravelTypeColor = (type) => {
    switch (type) {
      case 'flight': return 'bg-blue-500';
      case 'road_trip': return 'bg-green-500';
      case 'general': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handlePredict = async () => {
    if (!formData.from_location || !formData.to_location) {
      setError('Please enter both departure and destination locations');
      return;
    }

    if (formData.travel_types.length === 0) {
      setError('Please select at least one travel type');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const requestData = {
        from_location: formData.from_location,
        to_location: formData.to_location,
        travel_date: format(formData.travel_date, 'yyyy-MM-dd'),
        return_date: formData.return_date ? format(formData.return_date, 'yyyy-MM-dd') : null,
        num_travelers: formData.num_travelers,
        budget_category: formData.budget_category,
        travel_types: formData.travel_types
      };

      const response = await axios.post(`${API}/predict-travel-budget`, requestData);
      setPredictions(response.data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.response?.data?.detail || 'Failed to get travel predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4 font-serif">
            Budget Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get accurate travel cost predictions in Indian Rupees for flights, road trips, and complete travel packages using advanced machine learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/70" data-testid="prediction-form">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-6 w-6 text-orange-500" />
                Travel Details
              </CardTitle>
              <CardDescription>
                Enter your travel information to get budget predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Locations */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-location">From (City/Address)</Label>
                  <Input
                    id="from-location"
                    data-testid="from-location-input"
                    placeholder="New York, NY"
                    value={formData.from_location}
                    onChange={(e) => handleInputChange('from_location', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-location">To (City/Address)</Label>
                  <Input
                    id="to-location"
                    data-testid="to-location-input"
                    placeholder="Los Angeles, CA"
                    value={formData.to_location}
                    onChange={(e) => handleInputChange('to_location', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !formData.travel_date && "text-muted-foreground"
                        )}
                        data-testid="travel-date-picker"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.travel_date ? format(formData.travel_date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.travel_date}
                        onSelect={(date) => handleInputChange('travel_date', date)}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Return Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !formData.return_date && "text-muted-foreground"
                        )}
                        data-testid="return-date-picker"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.return_date ? format(formData.return_date, "PPP") : <span>Return date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.return_date}
                        onSelect={(date) => handleInputChange('return_date', date)}
                        initialFocus
                        disabled={(date) => date < formData.travel_date}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Travel Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Select 
                    value={formData.num_travelers.toString()} 
                    onValueChange={(value) => handleInputChange('num_travelers', parseInt(value))}
                  >
                    <SelectTrigger className="h-12" data-testid="travelers-select">
                      <SelectValue placeholder="Select travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          <span className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {num} {num === 1 ? 'Traveler' : 'Travelers'}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Category</Label>
                  <Select 
                    value={formData.budget_category} 
                    onValueChange={(value) => handleInputChange('budget_category', value)}
                  >
                    <SelectTrigger className="h-12" data-testid="budget-select">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">
                        <span className="flex items-center gap-2">
                          💰 Budget (Economy)
                        </span>
                      </SelectItem>
                      <SelectItem value="mid-range">
                        <span className="flex items-center gap-2">
                          💳 Standard (Mid-Range)
                        </span>
                      </SelectItem>
                      <SelectItem value="luxury">
                        <span className="flex items-center gap-2">
                          💎 Premium (Luxury)
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Travel Types */}
              <div className="space-y-3">
                <Label>Travel Types to Predict</Label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'flight', label: 'Flight', icon: Plane },
                    { id: 'road_trip', label: 'Road Trip', icon: Car },
                    { id: 'general', label: 'Complete Package', icon: Globe }
                  ].map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      variant={formData.travel_types.includes(id) ? "default" : "outline"}
                      onClick={() => handleTravelTypeToggle(id)}
                      className="flex items-center gap-2"
                      data-testid={`travel-type-${id}`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" data-testid="error-message">
                  {error}
                </div>
              )}

              <Button
                onClick={handlePredict}
                disabled={loading}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                data-testid="predict-button"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Predict Travel Budget
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {predictions && (
              <>
                {/* Trip Overview */}
                <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/70" data-testid="trip-overview">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      Trip Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Route</p>
                        <p className="text-gray-600">{predictions.from_coordinates.formatted_address}</p>
                        <p className="text-gray-600 mt-1">→ {predictions.to_coordinates.formatted_address}</p>
                      </div>
                      <div>
                        <p className="font-medium">Distance</p>
                        <p className="text-gray-600">{predictions.distance_km.toLocaleString()} km</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Predictions */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Budget Predictions</h2>
                  {predictions.predictions.map((prediction, index) => (
                    <Card key={index} className="shadow-lg border-0 backdrop-blur-sm bg-white/70" data-testid={`prediction-${prediction.travel_type}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getTravelTypeColor(prediction.travel_type)} text-white`}>
                              {getTravelTypeIcon(prediction.travel_type)}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold capitalize">
                                {prediction.travel_type.replace('_', ' ')} Travel
                              </h3>
                              <p className="text-sm text-gray-500">
                                Confidence: {(prediction.confidence_score * 100).toFixed(0)}%
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-2xl font-bold px-4 py-2" data-testid={`total-cost-${prediction.travel_type}`}>
                            {formatCurrency(prediction.predicted_cost)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-4" />
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-700 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Cost Breakdown
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(prediction.cost_breakdown).map(([category, amount]) => (
                              <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="capitalize text-sm font-medium">
                                  {category.replace('_', ' ')}
                                </span>
                                <span className="font-semibold" data-testid={`breakdown-${prediction.travel_type}-${category}`}>
                                  {formatCurrency(amount)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {!predictions && !loading && (
              <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/70" data-testid="welcome-card">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Ready to Plan Your Trip?</h3>
                    <p className="text-gray-600">
                      Fill in your travel details to get AI-powered budget predictions for different travel options.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;