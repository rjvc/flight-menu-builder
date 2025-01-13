import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./pages/HomePage";
import MenuComponent from "./components/Menu"; // Assuming this is your original Menu component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<MenuRoute />} />
        <Route path="/menu/:id" element={<MenuWithRedirect />} />
      </Routes>
    </Router>
  );
};

// MenuWithRedirect handles the redirect logic
const MenuWithRedirect = () => {
  const { id } = useParams(); // Extract id from URL params
  const navigate = useNavigate();

  // Log the id when the component mounts
  useEffect(() => {
    if (id) {
      navigate('/menu', { state: { menuId: id } });
    } else {
    }
  }, [id, navigate]);

  return null; // Don't render anything, just handle the redirect
};

const MenuRoute = () => {
  const location = useLocation(); // Get the current location
  const menuId = location.state?.menuId; // Access the id passed via state

  return <MenuComponent menuId={menuId} />; // Pass the menuId as a prop to MenuComponent
};

export default App;
