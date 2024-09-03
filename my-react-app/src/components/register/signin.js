import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to store the message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8084/register", {
        username,
        password,
        email,
      });

      if (response.data.success) {
        // Handle successful registration
        setMessage("Register successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after showing the message
      } else {
        setMessage("UserName Already Exists. ");
        // setTimeout(() => navigate("/login"), 2000); // Redirect after showing the message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister}>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>} {/* Conditionally render the message */}
    </div>
  );
}

export default Signin;
