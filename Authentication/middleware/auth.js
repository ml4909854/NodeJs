const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.auth.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, "masai"); // Use environment variable for JWT secret
    req.user = decoded; // Attach decoded user data to the request object
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;