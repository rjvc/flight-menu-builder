import React from "react";

const FoodType = ({
  foodPreferences,
  setFoodPreferences,
}) => {
   
  const handleFoodPreferenceChange = (e) => {
    const { name, value } = e.target;
    setFoodPreferences((prev) => ({ ...prev, [name]: value }));
  };
  return (
  <>
      <div >
        <label>What type of food is appreciated?</label>
        <div className="form-group">
          <label htmlFor="foodChoice1">Choice #1</label>
          <select 
            className="slc2"
            id="foodChoice1"
            name="choice1"
            value={foodPreferences.choice1}
            onChange={handleFoodPreferenceChange}
          >
            <option value="">Select</option>
            <option value="Chef suggestion (recommended)">
              Chef suggestion (recommended)
            </option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="foodChoice2">Choice #2</label>
          <select
            className="slc2"
            id="foodChoice2"
            name="choice2"
            value={foodPreferences.choice2}
            onChange={handleFoodPreferenceChange}
          >
            <option value="">Select</option>
            <option value="Spicy">Spicy</option>
            <option value="Salty">Salty</option>
            <option value="Sweey">Sweet</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FoodType;