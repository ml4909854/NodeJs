require("dotenv").config()
const connectDB = require("./db.js")
const express = require("express")
const app = express()
const userRouter = require("./controllers/userController.js")
const blogRouter = require("./controllers/blogController.js")
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))
app.use(express.json())

const port = process.env.PORT

app.use("/users" , userRouter)
app.use("/blogs" , blogRouter)
// health
app.get("/" , (req , res)=>{
    res.send("connected")
})

app.listen(3000 , async()=>{
   await connectDB()
    console.log(`${port} server is running`)
})