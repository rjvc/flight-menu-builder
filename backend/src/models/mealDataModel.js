const mongoose = require('mongoose');

const mealDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  airport: String,
  numPassengers: Number,
  numCrew: Number,
  mealType: String,
  selectedMeals: [String],
  breakfastType: String,
  foodPreferences: Object,
  dietaryRestrictions: [String],
  drinkPreference: String,
  device: String,
  timestamp: Date,
  ip: String,
});

const MealData = mongoose.model('MealData', mealDataSchema);
module.exports = MealData;