import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "../styles/HomePage.css";

const MenuView = ({ menuId: propMenuId, onBack }) => {
  const { id: urlMenuId } = useParams(); // Extract the ID from URL params
  const menuId = propMenuId || urlMenuId; // Prefer propMenuId, fallback to urlMenuId

  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/menu/${menuId}`);
        if (!response.ok) {
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
  }, [menuId]);

  if (loading) {
    return <div className="resMessage"><p className="roboto-light">L o a d i n g ...</p></div>;
  }

  if (error) {
    return <div className="resMessage"><p className="roboto-light" style={{ color: "red" }}>{error}</p></div>;
  }

  return (
    <div className="homepage-form">
      <button onClick={onBack} className="backButton roboto-light">
        ◀ go back
      </button>
      <h1 className="roboto-regular" style={{ padding: "1rem", color: "#334257" }}>
        Menu Details
      </h1>
      <div
        className="roboto-thin"
        style={{
          fontSize: "1rem",
          borderRadius: "8px",
          color: "white",
          lineHeight: "2.5",
        }}
      >
        <p>
          <strong>Airport:</strong> {menuData.airport || "N/A"}
        </p>
        <p>
          <strong>Passengers:</strong> {menuData.numPassengers || "N/A"}
        </p>
        <p>
          <strong>Crew:</strong> {menuData.numCrew || "N/A"}
        </p>
        <p>
          <strong>Meal Type:</strong> {menuData.mealType || "N/A"}
        </p>
        <p>
          <strong>Selected Meals:</strong> {menuData.selectedMeals?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Dietary Restrictions:</strong>{" "}
          {menuData.dietaryRestrictions?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Drink Preference:</strong> {menuData.drinkPreference || "N/A"}
        </p>
        <p>
          <strong>Submitted At:</strong>{" "}
          {menuData.timestamp ? new Date(menuData.timestamp).toLocaleString() : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MenuView;
