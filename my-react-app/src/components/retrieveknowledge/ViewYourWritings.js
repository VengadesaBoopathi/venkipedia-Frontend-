import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewYourWritings() {
  const [selectedBlog, setSelectedBlog] = useState(null); // State to handle selected blog
  const [expandedSections, setExpandedSections] = useState({}); // State for dropdowns
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userId) {
      navigate("/login");
      return; // Ensure no further code runs
    }

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${userId}`
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Error fetching blogs. Please try again.");
      }
    };
    fetchBlogs();
  }, [userId, navigate]);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog
  };

  const toggleDropdown = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleEditClick = (blog) => {
    navigate("/CreateBlog", { state: { blog } }); // Navigate to write page with selected blog data
  };

  const handleRemoveClick = async (blogId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete/${blogId}`);
      console.log("Blog removed successfully");
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      setSelectedBlog(null); // Clear the selected blog after removal
    } catch (error) {
      console.error("Error removing blog:", error);
      alert("Error removing blog. Please try again.");
    }
  };

  return (
    <div className="blog-container">
      <div className="blog-list">
        <h1> Hi! {userId} </h1>
        <h2>Check Your Blogs</h2>

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
              <div className="blogbutton">
                <button
                  onClick={() =>
                    navigate("/BloginDetail2", { state: { blog } })
                  }
                >
                  Open in New Page
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Blogs found.</p>
        )}
      </div>

      <div className="blog-details">
        {selectedBlog ? (
          <div>
            <h2>{selectedBlog.title}</h2>
            <p>
              <strong>Description:</strong> {selectedBlog.description}
            </p>
            <p>
              <strong>Author:</strong> {selectedBlog.userId}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedBlog.createdAt).toLocaleDateString()}
            </p>
            <button onClick={() => toggleDropdown(`what-${selectedBlog.id}`)}>
              {expandedSections[`what-${selectedBlog.id}`]
                ? "Hide What"
                : "Show What"}
            </button>
            {expandedSections[`what-${selectedBlog.id}`] && (
              <p>
                <strong>What:</strong> {selectedBlog.what}
              </p>
            )}
            <button onClick={() => toggleDropdown(`why-${selectedBlog.id}`)}>
              {expandedSections[`why-${selectedBlog.id}`]
                ? "Hide Why"
                : "Show Why"}
            </button>
            {expandedSections[`why-${selectedBlog.id}`] && (
              <p>
                <strong>Why:</strong> {selectedBlog.why}
              </p>
            )}
            <button onClick={() => toggleDropdown(`how-${selectedBlog.id}`)}>
              {expandedSections[`how-${selectedBlog.id}`]
                ? "Hide How"
                : "Show How"}
            </button>
            {expandedSections[`how-${selectedBlog.id}`] && (
              <p>
                <strong>How:</strong> {selectedBlog.how}
              </p>
            )}
            <button onClick={() => toggleDropdown(`whatif-${selectedBlog.id}`)}>
              {expandedSections[`whatif-${selectedBlog.id}`]
                ? "Hide What If"
                : "Show What If"}
            </button>
            {expandedSections[`whatif-${selectedBlog.id}`] && (
              <p>
                <strong>What If:</strong> {selectedBlog.whatIf}
              </p>
            )}
            <button
              onClick={() => toggleDropdown(`additional-${selectedBlog.id}`)}
            >
              {expandedSections[`additional-${selectedBlog.id}`]
                ? "Hide Additional Info"
                : "Show Additional Info"}
            </button>
            {expandedSections[`additional-${selectedBlog.id}`] && (
              <p>
                <strong>Additional Details:</strong>{" "}
                {selectedBlog.additionalDetails}
              </p>
            )}
            {/* Edit and Remove buttons */}
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                marginRight: "10px",
              }}
              onClick={() => handleEditClick(selectedBlog)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => handleRemoveClick(selectedBlog.id)}
            >
              Remove
            </button>
          </div>
        ) : (
          <h3>Select a blog to view or Edit/Delete Your Blog</h3>
        )}
      </div>
    </div>
  );
}

export default ViewYourWritings;
