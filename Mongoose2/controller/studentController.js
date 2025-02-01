const express = require("express");
const StudentModel = require("../model/studentModel.js")
const router = express.Router();

// Add a New Student
router.post("/", async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "Student created successfully", Student: savedStudent });
  } catch (error) {
    res.status(400).json({ message: "Error creating Student", error: error.message });
  }
});

// Find Students or Get Students by Query
router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const Students = await StudentModel.find(filter);
    res.status(200).json({ Students });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Students", error: error.message });
  }
});

// Find a Single Student by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Student = await StudentModel.findById(id).populate("enrolcourse");
    if (!Student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ Student });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Student", error: error.message });
  }
});

// Update a Student by ID
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", Student: updatedStudent });
  } catch (error) {
    res.status(400).json({ message: "Error updating Student", error: error.message });
  }
});

// Delete a Student by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStudent = await StudentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully", Student: deletedStudent });
  } catch (error) {
    res.status(400).json({ message: "Error deleting Student", error: error.message });
  }
});

module.exports = router;