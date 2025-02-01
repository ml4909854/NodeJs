const express = require("express")
const app = express()
const connectDB = require("./config/db.js")

const userRouter = require("./controller/userController.js")
const profileRouter = require("./controller/profileController.js")
const productRouter = require("./controller/productController.js")
app.use(express.json())

app.use("/user" , userRouter)
app.use("/profile" , profileRouter)
app.use("/product" , productRouter)

app.listen(5000 , async ()=>{
    await connectDB()
    console.log("server is running and also conneted to the database")
})