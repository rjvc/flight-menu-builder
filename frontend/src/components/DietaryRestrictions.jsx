import React, { useState, useEffect } from "react";

const DietaryRestrictions = ({ onChange }) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  const handleDietaryChange = (e) => {
    const { value } = e.target;

    setDietaryRestrictions((prev) => {
      if (value === "None") {
        return ["None"];
      } else {
        const updated = prev.includes(value)
          ? prev.filter((diet) => diet !== value)
          : [...prev.filter((diet) => diet !== "None"), value];
        return updated;
      }
    });
  };

  useEffect(() => {
    onChange(dietaryRestrictions);
  }, [dietaryRestrictions, onChange]);

  return (
    <div>
      <label>Is there any dietary restriction?</label>
      <div className="form-group roboto-regular">
        {["Halal", "Kosher", "Gluten free", "Vegan", "None"].map((diet) => (
          <div className="checkbox-group" key={diet}>
            <input
              type="checkbox"
              id={diet}
              value={diet}
              checked={dietaryRestrictions.includes(diet)}
              onChange={handleDietaryChange}
            />
            <label htmlFor={diet}>{diet}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietaryRestrictions;
