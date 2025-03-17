const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const Auth = require("../middleware/Auth");
const CheckRole = require("../middleware/CheckRole");

// get all users

router.get("/" , Auth , CheckRole("admin"),async (req , res)=>{
    try {
        const findUser = await UserModel.find()
        res.status(200).json({message:"User fetched suceesfully!" , user:findUser
        })
    } catch (error) {
        res.status(500).json({message:"Error to get All users"})
    }
})

// register
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate request body
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ message: "Username, password, and role are required!" });
    }

    // Check if user already exists
    const checkUser = await UserModel.findOne({ username });
    if (checkUser) {
      return res
        .status(409)
        .json({
          message: "User already exists. Please use a different username.",
        });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashpassword, role });

    const savedUser = await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully!", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user!" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required!" });
      }
    const checkUser = await UserModel.findOne({ username });
    if (!checkUser) {
      return res.status(404).json({ message: "Please registered First!" });
    }

    const validatePassword = await bcrypt.compare(password, checkUser.password);
    if (!validatePassword) {
      res.status(401).json({ message: "Password Is Wrong" });
    }
    const token = jwt.sign({ _id: checkUser._id }, "masai", {
      expiresIn: "2h",
    });
    res
      .status(200)
      .json(
        { message: "Login succesffull", token: token, userID: checkUser._id }
      );
  } catch (error) {
    res.status(500).json({ message: "Error to Login!" });
  }
});
module.exports = router;
