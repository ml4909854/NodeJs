const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {
  res.send("HEy user");
});

// register router

router.post("/register", async (req, res) => {
  try {
    const UserData = req.body
    const saltRounds = 4
    const hashedPassword = await bcrypt.hash(UserData.password , saltRounds)
    const newUser = new UserModel({
        ...UserData , password:hashedPassword
    });
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ message: "user register sucessfully", User: savedUser });
  } catch (error) {
    res.status(404).json({ error: error, message: "error to register a user" });
  }
});
// login routes

router.post("/login", async (req, res) => {
  try {
    const {name, email, password } = req.body;
    const User = await UserModel.findOne({ email });

    if (!User) {
      res.status(404).json({ message: "user not found Please register first" });
    }
    const comparePassword = await bcrypt.compare(password , User.password)
    
    if (!comparePassword) {
        return res.status(401).json({ message: "Your password is wrong. Check your password." });
      }
    const token = jwt.sign({name ,email , randomMessage:"Hi Iam mahesh"} , "masai")
    res.status(200).json({ message: `${User.name} is logged sucessfully`  , token:token});
  } catch (err) {
    res.status(404).json({ message: "please register first" });
  }
});

module.exports = router;
