//frontend/src/components/AirportInput.jsx
import React, { useState, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import "../styles/HomePage.css"; // Ensure correct CSS for styling


const AirportInput = ({ airport, setAirport }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const airportSearchTimeout = useRef(null);

  const fetchAirports = async (searchQuery) => {
    if (!searchQuery) {
      setOptions([]); // Clear options if the input is empty
      return;
    }

    setLoading(true);
    try {
      const X_RAPIDAPI_KEY = process.env.REACT_APP_X_RAPIDAPI_KEY;
      const options = {
        method: "GET",
        url: "https://airport-info.p.rapidapi.com/airport",
        params: {
          iata: searchQuery,
        },
        headers: {
          "x-rapidapi-key": X_RAPIDAPI_KEY, // Access the API key from .env
          "x-rapidapi-host": "airport-info.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      if (response.data && typeof response.data === "object" && response.data.name) {
        const formattedOption = {
          value: response.data.iata || response.data.icao,
          label: `(${response.data.iata || response.data.icao}) ${response.data.name} `,
        };
        setOptions([formattedOption]); // Set the formatted option in state
      } else {
        setOptions([]); // Clear options if no valid data is returned
      }
    } catch (error) {
      console.error("Error fetching airport suggestions:", error);
      setOptions([]); // Clear options on error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleInputChange = (inputValue) => {
    clearTimeout(airportSearchTimeout.current);
    airportSearchTimeout.current = setTimeout(() => {
      fetchAirports(inputValue); // Fetch airports after delay to avoid multiple requests
    }, 300); // Adjust delay time if necessary
  };

  const handleChange = (selectedOption) => {
    setAirport(selectedOption ? selectedOption.value : ""); // Update airport state with selected value
  };

  return (
    <div className="form-group">
      <label htmlFor="airport">Enter Airport IATA/ICAO Code</label>
      <Select
        id="airport" // This links to the label's `for` attribute
        options={options} // Pass the airport options here
        onInputChange={handleInputChange} // Trigger search on input change
        onChange={handleChange} // Handle selection change
        placeholder="JFK, LHR..." // Placeholder for the select field
        className="sel-comp" // Custom styling class for the Select component
        isClearable // Allow clearing the selection
        isLoading={loading} // Show loading indicator while fetching
      />
    </div>
  );
};

export default AirportInput;
