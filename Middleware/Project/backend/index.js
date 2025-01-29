const express = require("express")
const app = express()
const cors = require("cors")

const corsOptions = {
    origin: '*',
    methods: 'GET,POST',         
  };
  
  app.use(cors(corsOptions));

app.get("/users" , (req , res)=>{
    res.status(200).json({message:"Hey I am from backend"})
})

app.listen(5000 , ()=>{
    console.log("server is running on port 5000")
})