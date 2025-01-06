import React from "react";
import Select from "react-select";

const FoodType = ({ foodPreferences, setFoodPreferences }) => {
  const handleFoodPreferenceChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta; // Get the name of the field
    setFoodPreferences((prev) => ({ ...prev, [name]: selectedOption ? selectedOption.value : "" }));
  };

  const optionsChoice1 = [
    { value: "Chef suggestion (recommended)", label: "Chef suggestion (recommended)" },
    { value: "Arabic", label: "Arabic" },
    { value: "French", label: "French" },
    { value: "Italian", label: "Italian" },
  ];

  const optionsChoice2 = [
    { value: "Spicy", label: "Spicy" },
    { value: "Salty", label: "Salty" },
    { value: "Sweet", label: "Sweet" },
    { value: "Vegan", label: "Vegan" },
  ];

  return (
    <>
      <div>
        <label>What type of food is appreciated?</label>
        <div className="form-group roboto-regular">
          <label htmlFor="foodChoice1">Choice #1</label>
          <Select
            id="foodChoice1"
            name="choice1"
            options={optionsChoice1}
            value={optionsChoice1.find((option) => option.value === foodPreferences.choice1) || null}
            onChange={handleFoodPreferenceChange}
            placeholder="Select"
            className="sel-comp"
            isClearable
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodChoice2">Choice #2</label>
          <Select
            id="foodChoice2"
            name="choice2"
            options={optionsChoice2}
            value={optionsChoice2.find((option) => option.value === foodPreferences.choice2) || null}
            onChange={handleFoodPreferenceChange}
            placeholder="Select"
            className="sel-comp"
            isClearable
          />
        </div>
      </div>
    </>
  );
};

export default FoodType;
