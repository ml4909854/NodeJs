const express = require("express");
// const ProfileModel = require("../model/ProfileModel");
const ProfileModel = require("../model/profileModel")
const router = express.Router();

// Add a New Profile
router.post("/", async (req, res) => {
  try {
    const newProfile = new ProfileModel(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json({ message: "Profile created successfully", Profile: savedProfile });
  } catch (error) {
    res.status(400).json({ message: "Error creating Profile", error: error.message });
  }
});

// Find Profiles or Get Profiles by Query
router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const Profiles = await ProfileModel.find(filter);
    res.status(200).json({ Profiles });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Profiles", error: error.message });
  }
});

// Find a Single Profile by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Profile = await ProfileModel.findById(id);
    if (!Profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ Profile });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Profile", error: error.message });
  }
});

// Update a Profile by ID
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProfile = await ProfileModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", Profile: updatedProfile });
  } catch (error) {
    res.status(400).json({ message: "Error updating Profile", error: error.message });
  }
});

// Delete a Profile by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProfile = await ProfileModel.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully", Profile: deletedProfile });
  } catch (error) {
    res.status(400).json({ message: "Error deleting Profile", error: error.message });
  }
});

module.exports = router;