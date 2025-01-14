import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useParams, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./pages/HomePage";
import MenuComponent from "./components/Menu"; // Assuming this is your original Menu component

// MenuWithRedirect handles the redirect logic
const MenuWithRedirect = () => {
  const { id } = useParams(); // Extract id from URL params
  const navigate = useNavigate();

  // Log the id when the component mounts
  useEffect(() => {
    if (id) {
      navigate('/menu', { state: { menuId: id } });
    }
  }, [id, navigate]);

  return null; // Don't render anything, just handle the redirect
};

const MenuRoute = () => {
  const location = useLocation(); // Get the current location
  const menuId = location.state?.menuId; // Access the id passed via state

  return <MenuComponent menuId={menuId} />; // Pass the menuId as a prop to MenuComponent
};

// Create the router with the future flag
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/menu",
      element: <MenuRoute />,
    },
    {
      path: "/menu/:id",
      element: <MenuWithRedirect />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // Opt-in to the future flag
    },
  }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
