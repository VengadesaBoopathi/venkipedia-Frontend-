import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/header";
import Login from "./components/register/login";
import Logout from "./components/register/logout";
import Signin from "./components/register/signin";
import Welcome from "./components/MainPage/welcome";
import ViewAllBlogs from "./components/retrieveknowledge/ViewAllBLogs";
import CreateBlog from "./components/addknowledge/write";
import ViewYourWritings from "./components/retrieveknowledge/ViewYourWritings";
import "./App.css";
import BlogDetails from "./components/retrieveknowledge/BlogInDetail";
import BlogInDetail2 from "./components/retrieveknowledge/BloginDetail2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/ViewAllBlogs" element={<ViewAllBlogs />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/BlogInDetail2" element={<BlogInDetail2 />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/CreateBlog" element={<CreateBlog />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/ViewYourWritings" element={<ViewYourWritings />} />
        {/* Redirect to /Welcome by default */}
        <Route path="*" element={<Navigate to="/Welcome" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
