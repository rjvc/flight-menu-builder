import React from "react";
import Select from "react-select";

const MealType = ({ mealType, setMealType }) => {
  const options = [
    { value: "hot", label: "Hot" },
    { value: "cold", label: "Cold" },
    { value: "both", label: "Both" },
  ];

  return (
    <div className="form-group roboto-regular">
      <label>Do you want hot or cold meals?</label>
      <Select
        id="mealType"
        value={options.find((option) => option.value === mealType)} // Match selected value
        onChange={(selectedOption) => setMealType(selectedOption.value)} // Update state with the selected value
        options={options}
        placeholder="Select"
        isClearable
        className="sel-comp"
      />
    </div>
  );
};

export default MealType;
