const express = require("express")

const userRoute = require("./Routes/userRoutes")
const productRoute = require("./Routes/productRoutes")
const app = express()
// In these code I am learn to buil a nested routing

app.use("/users" , userRoute)
app.use("/product" , productRoute)

app.get("/" , (req , res)=>{
    res.send("Hey there!")
})

app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})