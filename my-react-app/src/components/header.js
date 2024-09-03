import "../styles/navbar-style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username); // Set true if username exists
  }, []);

  const handleLogout = () => {
    // Remove user-related data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token"); // Optional: Remove token as well

    // Update login state
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="nav">
      <div>
        <ul className="sidenav">
          <li>
            <a className="active" href="#home">
              <button onClick={() => navigate("/welcome")}>Home</button>
            </a>
          </li>
          <li>
            <a>
              <button onClick={() => navigate("/ViewAllBlogs")}>Read</button>
            </a>
          </li>
          <li>
            <a>
              <button onClick={() => navigate("/CreateBlog")}>Write</button>
            </a>
          </li>
          <li>
            <a>
              <button onClick={() => navigate("/ViewYourWritings")}>
                Your Writings
              </button>
            </a>
          </li>
        </ul>
      </div>
      <div className="signup">
        <div>
          <ul>
            {!isLoggedIn ? (
              <>
                <li>
                  <a>
                    <button onClick={() => navigate("/login")}>Login</button>
                  </a>
                </li>
                <li>
                  <a>
                    <button onClick={() => navigate("/Signin")}>
                      Register
                    </button>
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a>
                  <button onClick={handleLogout}>Log out</button>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
