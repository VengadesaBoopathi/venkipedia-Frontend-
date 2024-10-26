import React from "react";
import { useLocation } from "react-router-dom";
import "../MainPage/welcome-style.css";
import { useState } from "react";

function BlogDetails({ blog: propBlog }) {
  const location = useLocation();
  const blog = propBlog || location.state?.blog;
    const [expandedSections, setExpandedSections] = useState({});
  if (!blog) {
    return <h3>Select a blog to view details</h3>;
    }
    
  const toggleDropdown = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="blogdetails">
      <h2>{blog.title}</h2>
      <p>
        <strong>Description:</strong> {blog.description}
      </p>
      <p>
        <strong>Author:</strong> {blog.userId}
      </p>
      <p>
        <strong>Date:</strong> {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <button onClick={() => toggleDropdown(`what-${blog.id}`)}>
        {expandedSections?.[`what-${blog.id}`] ? "Hide What" : "Show What"}
      </button>
      {expandedSections?.[`what-${blog.id}`] && (
        <p>
          <strong>What:</strong> {blog.what}
        </p>
      )}
      <button onClick={() => toggleDropdown(`why-${blog.id}`)}>
        {expandedSections?.[`why-${blog.id}`] ? "Hide Why" : "Show Why"}
      </button>
      {expandedSections?.[`why-${blog.id}`] && (
        <p>
          <strong>Why:</strong> {blog.why}
        </p>
      )}
      <button onClick={() => toggleDropdown(`how-${blog.id}`)}>
        {expandedSections?.[`how-${blog.id}`] ? "Hide How" : "Show How"}
      </button>
      {expandedSections?.[`how-${blog.id}`] && (
        <p>
          <strong>How:</strong> {blog.how}
        </p>
      )}
      <button onClick={() => toggleDropdown(`whatif-${blog.id}`)}>
        {expandedSections?.[`whatif-${blog.id}`]
          ? "Hide What If"
          : "Show What If"}
      </button>
      {expandedSections?.[`whatif-${blog.id}`] && (
        <p>
          <strong>What If:</strong> {blog.whatif}
        </p>
      )}
      <button onClick={() => toggleDropdown(`additional-${blog.id}`)}>
        {expandedSections?.[`additional-${blog.id}`]
          ? "Hide Additional Info"
          : "Show Additional Info"}
      </button>
      {expandedSections?.[`additional-${blog.id}`] && (
        <p>
          <strong>Additional Details:</strong> {blog.additionalDetails}
        </p>
      )}
    </div>
  );
}

export default BlogDetails;
