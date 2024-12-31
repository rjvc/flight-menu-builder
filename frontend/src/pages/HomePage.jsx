// pages/HomePage.jsx
import React, { useState } from "react";
import "../styles/HomePage.css";
import AirportInput from "../components/AirportInput";
import PassengerCount from "../components/PassengerCount";
import MealPreferences from "../components/MealPreferences";
import DietaryRestrictions from "../components/DietaryRestrictions";
import DrinkPreferences from "../components/DrinkPreferences";
import MealType from "../components/MealType";
import FoodType from "../components/FoodType";

const HomePage = () => {
  const [airport, setAirport] = useState("");
  const [numPassengers, setNumPassengers] = useState("");
  const [numCrew, setNumCrew] = useState("");
  const [mealType, setMealType] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [breakfastType, setBreakfastType] = useState("");
  const [foodPreferences, setFoodPreferences] = useState({ choice1: "", choice2: "" });
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [drinkPreference, setDrinkPreference] = useState("");
  
  const handleDietaryChange = (updatedRestrictions) => {
    console.log("Updated Dietary Restrictions:", updatedRestrictions);
  };

  return (
    <>
    <form>
      <div className="homepage-form">
        <AirportInput airport={airport} setAirport={setAirport} />
        <PassengerCount
          numPassengers={numPassengers}
          setNumPassengers={setNumPassengers}
          numCrew={numCrew}
          setNumCrew={setNumCrew} />
        <MealType
          mealType={mealType}
          setMealType={setMealType} />
      </div>
      <div className="homepage-form">
        <MealPreferences
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          breakfastType={breakfastType}
          setBreakfastType={setBreakfastType}
          foodPreferences={foodPreferences}
          setFoodPreferences={setFoodPreferences} />
      </div>
      <div className="homepage-form">
        <FoodType
          foodPreferences={foodPreferences}
          setFoodPreferences={setFoodPreferences} />
      </div>
      <div className="homepage-form">
        <DietaryRestrictions onChange={handleDietaryChange}
          dietaryRestrictions={dietaryRestrictions}
          setDietaryRestrictions={setDietaryRestrictions} />
      </div>
      <div className="homepage-form">
        <DrinkPreferences
          drinkPreference={drinkPreference}
          setDrinkPreference={setDrinkPreference} />
      </div>
      <div className="centeredBtn">
        <button type="submit">Submit</button>
      </div>
    </form></>
  );
};

export default HomePage;
