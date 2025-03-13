require("dotenv").config()
const express = require("express");
const UserModel = require("../model/UserModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../middleware/auth");
const checkAccess = require("../middleware/checkAcess");
const role = require("../constants/role");


// get all users =

router.get("/" ,Auth , checkAccess(role.admin) ,  async(req ,res)=>{
    try {
        const users = await UserModel.find()
        return res.status(200).json({message:"Allusers!" , users})
    } catch (error) {
        return res.status(500).json({message:"You have no permission to check all the Users!"})
    }
})
// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user already exists
    const checkUser = await UserModel.findOne({ username });
    if (checkUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({ username, password: hashPassword, role });
    const savedUser = await newUser.save();

    // Respond with success message
    return res.status(201).json({ message: "User account created, please login!", savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
});


// login router

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required!" });
    }

    // Check if user exists
    const checkUser = await UserModel.findOne({ username });
    if (!checkUser) {
      return res.status(404).json({ message: "Username does not exist. Please register first!" });
    }

    // Validate password
    const isvalidPassword = await bcrypt.compare(password, checkUser.password);
    if (!isvalidPassword) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: checkUser._id, username }, process.env.SK, { expiresIn: "1d" });

    // Respond with success message and token
    return res.status(201).json({username ,  message: "Login successful!", userId: checkUser._id, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Error during login!" });
  }
});

module.exports = router;