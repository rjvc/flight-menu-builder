import React, { useState } from "react";

const DrinkPreferences = ({ onChange }) => {
  const [drinkPreference, setDrinkPreference] = useState("");

  const handleDrinkChange = (e) => {
    const { value } = e.target;
    setDrinkPreference(value);
    onChange(value); // Pass the selected value to the parent
  };

  return (
    <div className="form-group">
      <label htmlFor="drinkPreference">What do you want for drinks?</label>
      <select
        id="drinkPreference"
        value={drinkPreference}
        onChange={handleDrinkChange}
      >
        <option value="">Select</option>
        <option value="Alcoholic & soft">Alcoholic & Soft drinks</option>
        <option value="Soft only">Soft drinks only</option>
        <option value="No drinks">No drinks</option>
      </select>
    </div>
  );
};

export default DrinkPreferences;
