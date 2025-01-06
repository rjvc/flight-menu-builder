import React from "react";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="pagetitle roboto-regular">
        <a href="http://localhost:3000/">light Meal Planner</a>
      </div>
      <div>
        <button style={{ 'display':'none'}} className="btnViewOrders roboto-regular">
          Orders
        </button>
      </div>
    </div> 
  );
};
export default NavBar;