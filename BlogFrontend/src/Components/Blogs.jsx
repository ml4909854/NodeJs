import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // State to store blogs

  // Function to fetch blogs
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/blogs");
      console.log(response.data)
      setBlogs(response.data); 
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Render blogs
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default Blogs;
