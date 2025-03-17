const express = require("express");
const Auth = require("../middleware/Auth");
const CheckRole = require("../middleware/CheckRole");
const BlogModel = require("../model/BlogModel");

const router = express.Router();

// Fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("author", "username");
    res.status(200).json({ message: "Blogs fetched successfully!", blogs });
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    res.status(500).json({ message: "Error fetching blogs!", error: error.message });
  }
});

// Create a new blog
router.post("/create", Auth, CheckRole("author"), async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const authorId = req.user._id;

    const newBlog = new BlogModel({ title, content, author: authorId });
    const createdBlog = await newBlog.save();

    res.status(201).json({ message: "Blog created successfully!", blog: createdBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog!", error: error.message });
  }
});

// Fetch blogs of the logged-in author
router.get("/myblogs", Auth, CheckRole("author"), async (req, res) => {
  try {
    const authorId = req.user._id;
    const myBlogs = await BlogModel.find({ author: authorId }).populate("author", "username");

    res.status(200).json({ message: "My blogs fetched successfully!", blogs: myBlogs });
  } catch (error) {
    console.error("Error fetching my blogs:", error);
    res.status(500).json({ message: "Error fetching my blogs!", error: error.message });
  }
});

// Update a blog
router.patch("/update/:id", Auth, async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "No blog found!" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, { new: true });

    res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog!", error: error.message });
  }
});

// Delete a blog
router.delete("/delete/:id", Auth, CheckRole("author"), async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "No blog found!" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied!" });
    }

    await BlogModel.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog!", error: error.message });
  }
});

module.exports = router;
