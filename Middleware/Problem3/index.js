const express = require("express");
const app = express();

const Timestamp = (req, res, next) => {
  console.log("first");
  req.request = Date.now();
  next();
  console.log("last");
};

// this is the middleware which is a router specific middleware that is used in the application it is called the very essential way in a programming

const userRoute = require("./routes/userRoutes");

app.use("/users", Timestamp, userRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("server is running on port of 3000");
});
