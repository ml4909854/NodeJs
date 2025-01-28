const express = require("express")
const app = express()

// application route middleware

function logger(req , res , next){
    console.log("First")
    next()
    console.log("lost")
}

//  this is the application type of middleware that we are used in a middleware
// Now we are use a second middle ware

const logger2 = (req ,res , next)=>{
    console.log("first logger2")
    next()
    console.log("last logger2")
}
app.use(logger)
app.use(logger2)

app.use("/" , (req , res , next)=>{
    console.log("Hello world")
    res.send("Hello world")
    next()
})

app.get("/" , (req , res)=>{
    console.log("I am from users!")
})


app.listen(5000 , ()=>{
    console.log("server is running on port 5000")
})