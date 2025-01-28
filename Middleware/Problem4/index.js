const express = require("express")
const app = express()
const logger = require("./middleware/logger.js")


// here we a created a middleware into a separeted files
app.get("/" ,logger , (req , res)=>{
    console.log("hello world !")
   res.send("Hello World!")
})
app.listen(3000 , ()=>{
    console.log("server is runnng on a port of 3000")
})