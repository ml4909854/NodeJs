const express = require("express");
const UserModel = require("../model/userModel");
const router = express.Router();

// Add a New User
router.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
});

// Find Users or Get Users by Query
router.get("/", async (req, res) => {
  try {
    // const filter = req.query;
    const getUsers = await UserModel.find();
    res.status(200).json({ getUsers });
  } catch (error) {
    res.status(400).json({ message: "Error fetching users", error: error.message });
  }
});

// Find a Single User by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // we are also populate with the in the form of array like in which both orderID and the profileID populate
    const user = await UserModel.findById(id).populate(["ordersId" , "ProfileId"]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "Error fetching user", error: error.message });
  }
});

// Update a User by ID
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error: error.message });
  }
});

// Delete a User by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;