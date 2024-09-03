import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogDetails from "./BlogInDetail";
import { useNavigate } from "react-router-dom";

function ViewAllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8084/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Error fetching blogs. Please try again.");
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const toggleDropdown = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const navigateToBlogDetails = (blog) => {
    navigate("/BlogDetails", { state: { blog } });
  };

  return (
    <div className="blog-container">
      <div className="blog-list">
        <h2>All Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-item"
              onClick={() => handleBlogClick(blog)}
            >
              <div className="authordetails">
                <div>
                  <p>
                    <strong>Author:</strong> {blog.userId}
                  </p>
                </div>
                <div className="date">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="blogdetails">
                <div className="topic">
                  <h3>{blog.title}</h3>
                </div>
                <div className="desc">
                  <p>{blog.description}</p>
                </div>
                <div className="what">
                  <p>{blog.what}</p>
                </div>
              </div>
              <div>
                <button onClick={() => navigateToBlogDetails(blog)}>
                  Click to View in Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Blogs found.</p>
        )}
      </div>

      <div className="blog-details">
        <BlogDetails
          blog={selectedBlog}
          expandedSections={expandedSections}
          toggleDropdown={toggleDropdown}
        />
      </div>
    </div>
  );
}

export default ViewAllBlogs;
