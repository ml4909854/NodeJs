const express = require("express");
const CourseModel = require("../model/courseModel.js")
const router = express.Router();

// Add a New Course
router.post("/", async (req, res) => {
  try {
    const newCourse = new CourseModel(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json({ message: "Course created successfully", Course: savedCourse });
  } catch (error) {
    res.status(400).json({ message: "Error creating Course", error: error.message });
  }
});

// Find Courses or Get Courses by Query
router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const Courses = await CourseModel.find(filter);
    res.status(200).json({ Courses });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Courses", error: error.message });
  }
});

// Find a Single Course by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Course = await CourseModel.findById(id).populate("studentId");
    if (!Course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ Course });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Course", error: error.message });
  }
});

// Update a Course by ID
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully", Course: updatedCourse });
  } catch (error) {
    res.status(400).json({ message: "Error updating Course", error: error.message });
  }
});

// Delete a Course by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully", Course: deletedCourse });
  } catch (error) {
    res.status(400).json({ message: "Error deleting Course", error: error.message });
  }
});

module.exports = router;