const express = require("express")
const app = express()
// const helmet = require("helmet")
const bodyParser = require("body-parser")

// app.use(helmet())
// app.use(bodyParser.json())

app.post("/" , (req , res)=>{
    console.log(req.body)
    res.send(req.body)
})

app.listen(4000 , ()=>{
    console.log("server is running")
})