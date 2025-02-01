const express = require("express");
const ProfileModel = require("../model/ProfileModel.js");
const router = express.Router();

// post Profile
router.post("/", async (req, res) => {
  try {
    const newProfile = new ProfileModel(req.body);
    const savedProfile = await newProfile.save();
    res.json(savedProfile);
  } catch (error) {
    res.json(error);
  }
});

// get the data

router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const getProfile = await ProfileModel.find(filter);
    res.json(getProfile);
  } catch (error) {
    res.json(error);
  }
});

// get a separate Profile

router.get("/:id", async (req, res) => {
  try {
    const getProfile = await ProfileModel.findById(req.params.id);
    res.json(getProfile);
  } catch (error) {
    res.json(error);
  }
});

// updata a Profile
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const updateProfile = await ProfileModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateProfile);
    res.json(updateProfile);
  } catch (error) {
    res.json(error);
  }
});

// delete a Profile
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProfile = await ProfileModel.findByIdAndDelete(id);
    res.json(deleteProfile);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
