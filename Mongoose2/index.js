const express = require("express");
const app = express();
const ConnectDB = require("./config/db.js");
const userRouter = require("./controller/userController.js");
const profileRouter = require("./controller/profileController.js");
const productRouter = require("./controller/productController.js")
const studentRouter = require("./controller/studentController.js")
const courseRouter = require("./controller/courseController.js")
// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Routes
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/product" ,productRouter)
app.use("/student" ,studentRouter )
app.use("/course" , courseRouter)

// Error-handling middleware
// app.use((err, req, res, next) => {
//   =
//   res.status(500).json({ message: "Something went wrong!", error: err.message });
// });

// Start the server
const PORT = 8080;
app.listen(PORT, async () => {
  try {
    await ConnectDB();
    console.log(`Server is listening on port ${PORT} and connected to the database`);
  } catch (error) {
    console.log("Error starting the server:", error);
  }
});