import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user-related data from localStorage
    localStorage.removeItem("username");
    // Optionally, remove other items if necessary
    // localStorage.removeItem("token"); // example

    // Redirect to login page
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
