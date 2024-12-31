import React from "react";
import Select from "react-select";

const PassengerCount = ({ numPassengers, setNumPassengers, numCrew, setNumCrew }) => {
  // Generate options for the select component
  const passengerOptions = [...Array(20).keys()].map((i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));

  return (
    <div className="form-group-wrapper">
      <div className="form-group">
        <label htmlFor="numPassengers">How many passengers need meals?</label>
        <Select
          id="numPassengers"
          value={passengerOptions.find((option) => option.value === numPassengers)}
          onChange={(selectedOption) => setNumPassengers(selectedOption ? selectedOption.value : "")}
          options={passengerOptions}
          placeholder="Select"
          className="sel-comp"
        />
      </div>

      <div className="form-group">
        <label htmlFor="numCrew">How many crew need meals?</label>
        <Select
          id="numCrew"
          value={passengerOptions.find((option) => option.value === numCrew)}
          onChange={(selectedOption) => setNumCrew(selectedOption ? selectedOption.value : "")}
          options={passengerOptions}
          placeholder="Select"
          className="sel-comp"
        />
      </div>
    </div>
  );
};

export default PassengerCount;
