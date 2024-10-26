import "./welcome-style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ViewAllBlogs from "../retrieveknowledge/ViewAllBLogs";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Venkipedia</h1>
      <div className="button-container">
        <button onClick={() => navigate("/CreateBlog")}>
          Share Knowledge with others
        </button>
        <button onClick={() => navigate("/ViewYourWritings")}>
          View your Writings
        </button>
      </div> 
    </div>
  );
}

function Welcome() {
  return (
    <div>
      <Intro />
      <ViewAllBlogs />
    </div>
  );
}

export default Welcome;
