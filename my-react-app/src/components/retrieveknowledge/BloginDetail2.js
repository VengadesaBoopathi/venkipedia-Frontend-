import React from "react";
import { useLocation } from "react-router-dom";
import BlogDetails from "./BlogInDetail";

function BlogInDetail2() {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) {
    return <p>Blog data not found.</p>;
  }

  return (
    <div className="blog-details-container">
      <BlogDetails blog={blog} />
    </div>
  );
}

export default BlogInDetail2;
