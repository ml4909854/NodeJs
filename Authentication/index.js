//  mongodb://127.0.0.1:27017

const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const userRouter = require("./controller/userController.js");
const isAuthenticated = require("./middleware/auth.js");

app.use(express.json());
app.use("/users", userRouter);

app.get("/health-check", (req, res) => {
  res.send("Hey Health is good");
});

app.get("/privateData", isAuthenticated , (req, res) => {
    
    res.send(`${req.user.email} see our PrivateData `);
});

app.get("/orders",isAuthenticated, (req, res) => {
  res.send("Orders Data!");
});

app.get("/Cart",isAuthenticated, (req, res) => {
  res.send("Cart Data!");
});

app.listen(8080, async () => {
  await connectDB();
  console.log("server is running on port ");
});
