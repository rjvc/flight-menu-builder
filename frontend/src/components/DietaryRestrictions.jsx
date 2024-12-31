//components/DietaryRestrictions.jsx
import React, { useState } from "react";

const DietaryRestrictions = ({ onChange }) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  const handleDietaryChange = (e) => {
    const { value } = e.target;
    setDietaryRestrictions((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((diet) => diet !== value)
        : [...prev, value];
      onChange(updated); // Pass the updated array to the parent
      return updated;
    });
  };

  return (
    <div >
      <label>Is there any dietary restriction?</label>
      <div className="form-group">
        {["Halal", "Kosher", "Gluten free", "Vegan", "None"].map((diet) => (
          <div  className="checkbox-group" key={diet}>
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
