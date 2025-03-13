const express = require("express");
const BlogModel = require("../model/BlogModel");
const Auth = require("../middleware/auth");
const checkAccess = require("../middleware/checkAcess");
const role = require("../constants/role");
const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("author", "username");
    return res.status(200).json({ message: "All blogs fetched successfully!", blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Error fetching blogs" });
  }
});


// get own blog
router.get("/myBlog", Auth, checkAccess(role.author), async (req, res) => {
    try {
      const authorId = req.user._id;
  
      // Find all blogs authored by the user
      const myBlogs = await BlogModel.find({ author: authorId }).populate("author", "username");
        if (myBlogs.length === 0) {
        return res.status(404).json({ message: "No blogs found for this author!" });
      }
        return res.status(200).json({ message: "Your blogs!", myBlogs });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).json({ message: "Error fetching your blogs!" });
    }
  });


// Create a blog
router.post("/create", Auth, checkAccess(role.author), async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user._id;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content fields are required" });
    }

    // Create and save the blog
    const createBlog = new BlogModel({ title, content, author: authorId });
    const savedBlog = await createBlog.save();

    // Respond with success message
    return res.status(201).json({ message: "Blog created successfully!", savedBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Error creating blog" });
  }
});


// update Blog....
router.patch(
    "/update/:id",
    Auth,
    checkAccess(role.author),
    async (req, res) => {
      try {
        const blogId = req.params.id;
        const blog = await BlogModel.findById(blogId);
  
        if (!blog) {
          return res.status(404).json({ message: "Not found!" });
        }
  
        if (blog.author.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: "Access Denied!" });
        }
  
        const updateBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
          new: true,
        });
        res.status(200).json({message:"BLog updataed" , updateBlog});
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );
  
//   delete a blog

router.delete(
    "/delete/:id",
    Auth,
    checkAccess(role.author),
    async (req, res) => {
      try {
        const blogId = req.params.id;
        const blog = await BlogModel.findById(blogId);
  
        if (!blog) {
          return res.status(404).json({ message: "Not found!" });
        }
  
        if (blog.author.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: "Access Denied!" });
        }
  
        const deleteblog = await BlogModel.findByIdAndDelete(blogId);
        res.status(200).json({deleteblog , message:"blog de"});
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

module.exports = router;