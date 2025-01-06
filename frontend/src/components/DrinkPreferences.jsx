import React, { useState } from "react";
import Select from "react-select";

const DrinkPreferences = ({ onChange }) => {
  const [drinkPreference, setDrinkPreference] = useState(null);

  const options = [
    { value: "Alcoholic & soft", label: "Alcoholic & Soft drinks" },
    { value: "Soft only", label: "Soft drinks only" },
    { value: "No drinks", label: "No drinks" },
  ];

  const handleDrinkChange = (selectedOption) => {
    setDrinkPreference(selectedOption);
    onChange(selectedOption ? selectedOption.value : ""); // Pass the selected value to the parent
  };

  return (
    <div className="form-group roboto-regular">
      <label htmlFor="drinkPreference">What do you want for drinks?</label>
      <Select
        id="drinkPreference"
        value={drinkPreference}
        onChange={handleDrinkChange}
        options={options}
        placeholder="Select"
        className="sel-comp"
        isClearable
      />
    </div>
  );
};

export default DrinkPreferences;
