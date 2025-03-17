require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const userRouter = require("./userRouter/UserController.js")
const blogRouter = require("./userRouter/BlogController.js")
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use("/users" , userRouter)
app.use("/blogs", blogRouter)

app.get("/" , (req , res)=>{
    res.send("connected!")
})


app.listen(7000, async () => {
 await connectDB()
  console.log("server is running on port 3000");
});
