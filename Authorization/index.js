const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const userRouter = require("./controller/userController.js");
const connectDB = require("./config/db");
const isAuthenticated = require("./middleware/auth.js");
const checkAcess = require("./middleware/checkAcess.js");
const blackList = require("./blackList.js");

app.use(express.json());
app.use("/users", userRouter);

// privateData
app.get("/privateData", isAuthenticated, (req, res) => {
  res.send("PrivateData!");
});

app.get("/admin/data", isAuthenticated, checkAcess("admin"), (req, res) => {
  res.send("Hey admin");
});
// author data
app.get("/author/data", isAuthenticated, checkAcess("author"), (req, res) => {
  res.send("Hey author!");
});

app.get("/logout", (req, res) => {
  const token = req.headers.auth.split(" ")[1];
  if (token) {
    blackList.add(token);
  }
  console.log(blackList);
  res.send("logout sucessfull!");
});

// generate a new acess token
app.post("/generate", (req, res) => {
  const refresToken = req.body.token;
  jwt.verify(refresToken, "refreshMasai", (err, decode) => {
    if (err) {
      res.status(404).json({ message: "error to generate a new token" });
    }

    console.log(decode)
    const acessToken = jwt.sign(
      { email: decode.email, role: decode.role, random: "Hi iam from User" },
      "acessMasai",
      { expiresIn: "20s" }
    );
    res.status(200).json({acessToken})
  });
});

app.listen(8080, async () => {
  await connectDB();
  console.log("server is running");
});
