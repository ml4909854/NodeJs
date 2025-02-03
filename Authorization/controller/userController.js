const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register router
router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res.status(200).json({ message: "User saved successfully", User: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// Login router
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });

    if (!User) {
      return res.status(404).json({ message: "User not found!" });
    }

    const comparePassword = await bcrypt.compare(password, User.password);
    if (!comparePassword) {
     res.status(401).json({ message: "Password incorrect!" });
    }

    const acessToken = jwt.sign(
      { email: User.email, role: User.role, random: "Hi iam from User" },
      "acessMasai" ,{expiresIn:"20s"}
    );
    const refreshToken = jwt.sign(
      { email: User.email, role: User.role, random: "Hi iam from User" },
      "refreshMasai" ,{expiresIn:"1d"}
    );

    res.status(200).json({ message: "User login successful!", acessToken , refreshToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;