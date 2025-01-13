import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // UseLocation to access state
import NavBar from "./NavBar";
import FooterComp from "./FooterComp";
import MenuChoose from "./MenuChoose";
import MenuView from "./MenuView";
import "../styles/HomePage.css";

const Menu = () => {
  const location = useLocation(); // Access the location object
  const [menuId, setMenuId] = useState(null); // Initialize state for menuId

  // Use location.state to access the menuId passed in the navigation
  useEffect(() => {
    if (location.state && location.state.menuId) {
      setMenuId(location.state.menuId); // Set the menuId from state
    }
  }, [location.state]); // Only run when location.state changes

  // Conditional rendering based on the state of menuId
  return (
    <>
      <NavBar />
      <div className="homepage-container">
        {menuId ? (
          <MenuView
            menuId={menuId} // Pass the menuId as prop to MenuView
            onBack={() => setMenuId(null)} // Handle back action
          />
        ) : (
          <MenuChoose
            onSubmit={(id) => setMenuId(id)} // Set the menuId when a choice is made
          />
        )}
      </div>
      <FooterComp />
    </>
  );
};

export default Menu;
