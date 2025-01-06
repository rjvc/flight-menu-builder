import React, { useState } from "react";
import "../styles/HomePage.css";
import AirportInput from "../components/AirportInput";
import PassengerCount from "../components/PassengerCount";
import MealPreferences from "../components/MealPreferences";
import DietaryRestrictions from "../components/DietaryRestrictions";
import DrinkPreferences from "../components/DrinkPreferences";
import MealType from "../components/MealType";
import FoodType from "../components/FoodType";
import FooterComp from "../components/FooterComp";
import NavBar from "../components/NavBar";

const SuccessMessage = ({ message, onClose }) => (
  <div className="success-message">
    <p>{message}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [device] = useState(navigator.userAgent);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isNameValid = name.trim() !== "";

  const isSection1Complete = airport && numPassengers && numCrew && mealType;
  const isSection2Complete = selectedMeals.length > 0 && (!selectedMeals.includes("Breakfast") || breakfastType);
  const isSection3Complete = foodPreferences.choice1;
  const isSection4Complete = dietaryRestrictions.length > 0;
  const isSection5Complete = drinkPreference;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      airport,
      numPassengers,
      numCrew,
      mealType,
      selectedMeals,
      breakfastType: selectedMeals.includes("Breakfast") ? breakfastType : null,
      foodPreferences,
      dietaryRestrictions,
      drinkPreference,
      device,
      timestamp: new Date(),
    };

    sendToBackend(formData);
    setIsSubmitted(true);
  };

  const sendToBackend = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/api/save-meal-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setAirport("");
    setNumPassengers("");
    setNumCrew("");
    setMealType("");
    setSelectedMeals([]);
    setBreakfastType("");
    setFoodPreferences({ choice1: "", choice2: "" });
    setDietaryRestrictions([]);
    setDrinkPreference("");
    setEmail("");
    setName("");
  };

  return (
    <>
      <NavBar />
      {isSubmitted ? (
        <SuccessMessage
          message="Menu submitted successfully!"
          onClose={resetForm}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="homepage-form f1">
            <AirportInput airport={airport} setAirport={setAirport} />
            <PassengerCount
              numPassengers={numPassengers}
              setNumPassengers={setNumPassengers}
              numCrew={numCrew}
              setNumCrew={setNumCrew}
            />
            <MealType mealType={mealType} setMealType={setMealType} />
          </div>

          {isSection1Complete && (
            <div className="homepage-form f2">
              <MealPreferences
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
                breakfastType={breakfastType}
                setBreakfastType={setBreakfastType}
              />
            </div>
          )}

          {isSection1Complete && isSection2Complete && (
            <div className="homepage-form f3">
              <FoodType
                foodPreferences={foodPreferences}
                setFoodPreferences={setFoodPreferences}
              />
            </div>
          )}

          {isSection1Complete && isSection2Complete && isSection3Complete && (
            <div className="homepage-form f4">
              <DietaryRestrictions
                onChange={(updatedRestrictions) =>
                  setDietaryRestrictions(updatedRestrictions)
                }
              />
            </div>
          )}

          {isSection1Complete &&
            isSection2Complete &&
            isSection3Complete &&
            isSection4Complete && (
              <div className="homepage-form f5">
                <DrinkPreferences
                  onChange={(updatedDrinkPreference) =>
                    setDrinkPreference(updatedDrinkPreference)
                  }
                />
              </div>
            )}

          {isSection1Complete &&
            isSection2Complete &&
            isSection3Complete &&
            isSection4Complete &&
            isSection5Complete && (
              <div className="homepage-form f6">
                <div className="form-group roboto-light">
                  <label htmlFor="name">Enter your name</label>
                  <input
                    id="name"
                    className="user-data-input roboto-light"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group roboto-light">
                  <label htmlFor="email">Enter your email</label>
                  <input
                    id="email"
                    className="user-data-input roboto-light"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your Email"
                  />
                </div>
                {isEmailValid && isNameValid && (
                  <div className="centeredBtn roboto-light">
                    <button className="submitButton" type="submit">Submit</button>
                  </div>
                )}
              </div>
            )}
        </form>
      )}
      <FooterComp />
    </>
  );
};

export default HomePage;
