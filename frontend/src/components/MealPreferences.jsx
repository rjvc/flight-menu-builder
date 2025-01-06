import React from "react";
import Select from "react-select";

const MealPreferences = ({
  selectedMeals,
  setSelectedMeals,
  breakfastType,
  setBreakfastType,
}) => {
  const handleMealChange = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((item) => item !== meal) : [...prev, meal]
    );

    // Reset breakfast type if Breakfast is deselected
    if (meal === "Breakfast" && selectedMeals.includes(meal)) {
      setBreakfastType("");
    }
  };

  // Options for breakfast type
  const breakfastOptions = [
    { value: "American", label: "American" },
    { value: "Continental", label: "Continental" },
    { value: "Scandinavian", label: "Scandinavian" },
  ];

  return (
    <>
      <label>For passengers, which meals do you need?</label>
      <div className="form-group roboto-regular">
        {["Breakfast", "Lunch", "Dinner", "Snack"].map((meal) => (
          <div className="checkbox-group" key={meal}>
            <input
              type="checkbox"
              id={meal}
              value={meal}
              checked={selectedMeals.includes(meal)}
              onChange={() => handleMealChange(meal)}
            />
            <label htmlFor={meal}>{meal}</label>
          </div>
        ))}
      </div>

      {selectedMeals.includes("Breakfast") && (
        <div className="form-group marg_top">
          <label htmlFor="breakfastType">What type of breakfast is appreciated?</label>
          <Select
            id="breakfastType"
            value={breakfastOptions.find(option => option.value === breakfastType)}
            onChange={(selectedOption) =>
              setBreakfastType(selectedOption ? selectedOption.value : "")
            }
            options={breakfastOptions}
            placeholder="Select"
            className="sel-comp"
            isClearable
          />
        </div>
      )}
    </>
  );
};

export default MealPreferences;
