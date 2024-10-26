import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [how, setHow] = useState("");
  const [whatif, setWhatIf] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog; // Get blog data from location state

  useEffect(() => {
    const userId = localStorage.getItem("username");
    if (!userId) {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (blog) {
      // Populate form fields with existing blog data if available
      setTitle(blog.title || "");
      setDescription(blog.description || "");
      setWhat(blog.what || "");
      setWhy(blog.why || "");
      setHow(blog.how || "");
      setWhatIf(blog.whatif || "");
      setAdditionalDetails(blog.additionalDetails || "");
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("username");
    const blogData = {
      userId,
      title,
      description,
      what,
      why,
      how,
      whatif,
      additionalDetails,
      createdAt: new Date(),
    };

    try {
      if (blog && blog.id) {
        // Update existing blog
        await axios.put(
          `${process.env.REACT_APP_API_URL}/update/${blog.id}`,
          blogData
        );
        console.log("Blog updated successfully");
        setMessage("Blog updated successfully");
      } else {
        // Create new blog
        await axios.post(`${process.env.REACT_APP_API_URL}/create`, blogData);
        console.log("Blog created successfully");
        setMessage("Blog created successfully");
      }

      navigate("/ViewYourWritings"); // Redirect to blog listing or other page
    } catch (error) {
      console.error("Error processing blog:", error);
      setMessage("Error processing blog. Please try again.");
    }
  };

  return (
    <div className="blog-form-container">
      <form onSubmit={handleSubmit}>
        <div className="input1">
          <label>Title:</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input1">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>What:</label>
          <textarea
            value={what}
            onChange={(e) => setWhat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Why:</label>
          <textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>How:</label>
          <textarea
            value={how}
            onChange={(e) => setHow(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>whatif:</label>
          <textarea
            value={whatif}
            onChange={(e) => setWhatIf(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Additional Details:</label>
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>
        <div>
          <button id="inputsubmit" type="submit">
            {blog ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateBlog;
