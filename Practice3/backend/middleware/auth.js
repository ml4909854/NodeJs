require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const Auth = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify token
    const SK = process.env.SK;
    if (!SK) {
      return res.status(500).json({ message: "Server error: Secret key missing" });
    }

    const decoded = jwt.verify(token, SK);

    // Check if user exists in the database
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    // Generic error
    return res.status(401).json({ message: "Authentication Error" });
  }
};

module.exports = Auth;