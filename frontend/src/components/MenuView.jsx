import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import FooterComp from "./FooterComp";
import { useParams } from "react-router-dom";
import "../styles/HomePage.css";

const MenuView = () => {
  const { id } = useParams(); // Extract ID from the URL
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/menu/${id}`);
        if (!response.ok) {
          // Handle specific HTTP status codes
          if (response.status === 404) {
            throw new Error("Menu not found");
          }
          throw new Error("An error occurred while fetching data");
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [id]); // Re-fetch when the ID changes

  // Render loading or error messages
  if (loading) return <div><NavBar/><div className="resMessage"><p className="roboto-light" >L o a d i n g ...</p></div></div>;
  if (error) return <div><NavBar/> <div className="resMessage"><p className="roboto-light" style={{ color: "red" }}>{error}</p></div></div>;

  return (
    <>
      <NavBar />
      <h1
        className="roboto-regular"
        style={{ padding: "1rem", color: "#334257" }}
      >
        Menu Details
      </h1>
      <div className="homepage-form">
        <div
          className="roboto-thin"
          style={{
            "font-size": "1rem",
            borderRadius: "8px",
            color: "white",
            "line-height": "2.5",
          }}
        >
          <p>
            <strong>Airport:</strong> {menuData.airport}
          </p>
          <p>
            <strong>Passengers:</strong> {menuData.numPassengers}
          </p>
          <p>
            <strong>Crew:</strong> {menuData.numCrew}
          </p>
          <p>
            <strong>Meal Type:</strong> {menuData.mealType}
          </p>
          <p>
            <strong>Selected Meals:</strong> {menuData.selectedMeals.join(", ")}
          </p>
          <p>
            <strong>Dietary Restrictions:</strong>{" "}
            {menuData.dietaryRestrictions.join(", ")}
          </p>
          <p>
            <strong>Drink Preference:</strong> {menuData.drinkPreference}
          </p>
          <p>
            <strong>Submitted At:</strong>{" "}
            {new Date(menuData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default MenuView;
