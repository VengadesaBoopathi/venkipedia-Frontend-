import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful! Redirecting to Home Page");

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event("authChange"));

        setTimeout(() => navigate("/welcome"), 2000);
      } else {
        setMessage("Incorrect credentials, redirecting to register");
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login. Please try again.");
      setTimeout(() => navigate("/signin"), 2000);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="blogbutton">
          <button type="submit">Login</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
