import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar-style.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("username")
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const username = localStorage.getItem("username");
      setIsLoggedIn(!!username);
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    checkLoginStatus();
    handleResize();

    window.addEventListener("authChange", checkLoginStatus);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("authChange", checkLoginStatus);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    setMenuOpen(false); // Close the menu after logout
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close the menu after navigation
  };

  return (
    <div className="nav">
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={menuOpen ? "show" : ""}>
        <li>
          <a onClick={() => handleNavigation("/welcome")}>Home</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/ViewAllBlogs")}>Read</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/CreateBlog")}>Write</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/ViewYourWritings")}>
            Your Writings
          </a>
        </li>
      </ul>
      <div className="signup">
        {!isLoggedIn ? (
          <>
            <button onClick={() => handleNavigation("/login")}>Login</button>
            <button onClick={() => handleNavigation("/Signin")}>
              Register
            </button>
          </>
        ) : (
          (!isSmallScreen || menuOpen) && (
            <button onClick={handleLogout}>Log out</button>
          )
        )}
      </div>
    </div>
  );
}

export default Navbar;
