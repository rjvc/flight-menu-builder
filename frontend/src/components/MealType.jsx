import React, { useEffect, useState } from "react";
import Select from "react-select";

const apiUrl = process.env.REACT_APP_API_URL;

const MealType = ({ mealType, setMealType }) => {
  const [mealTypes, setMealTypes] = useState([]);
  
  fetch(`${apiUrl}/api/meal-types`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const options = data.map((mealType) => ({
        value: mealType.id,
        label: mealType.name,
      }));
      setMealTypes(options);
    })
    .catch((error) => console.error("Error fetching meal types:", error));

  return (
    <div className="form-group roboto-regular">
      <label>Do you want hot or cold meals?</label>
      <Select
        id="mealType"
        value={mealTypes.find((option) => option.value === mealType)} // Match selected value
        onChange={(selectedOption) => setMealType(selectedOption.value)} // Update state with the selected value
        options={mealTypes}  // Dynamically populated options
        placeholder="Select"
        isClearable
        className="sel-comp"
      />
    </div>
  );
};

export default MealType;
