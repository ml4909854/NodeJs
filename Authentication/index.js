//  mongodb://127.0.0.1:27017

const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const userRouter = require("./controller/userController.js");
const isAuthenticated = require("./middleware/auth.js");
const checkAcess = require("./middleware/checkAcess.js");

app.use(express.json());
app.use("/users", userRouter);

app.get("/health-check", (req, res) => {
  res.send("Hey Health is good");
});

app.get("/privateData", isAuthenticated , (req, res) => {
    res.send(`${req.user.name} see our PrivateData `);
});


app.get("/orders",isAuthenticated, (req, res) => {
  res.send("Orders Data!");
});

app.get("/Cart",isAuthenticated, (req, res) => {
  res.send("Cart Data!");
});


// admin data or private Admin data

app.get("/admin/data" , isAuthenticated , checkAcess("admin") , (req , res)=>{
  res.send("Hey admin!")
})

app.get("/author/data" , isAuthenticated , checkAcess("author") , (req , res)=>{
  res.send("Hey author")
})
app.get("/writter/data" , isAuthenticated , checkAcess("writter") , (req , res)=>{
  res.send("Hey writter")
})


app.listen(8080, async () => {
  await connectDB();
  console.log("server is running on port ");
});
