const express = require("express")
const router = express.Router()

router.get("/" , (req ,res)=>{
    res.send("Hey I am from user")
})

router.get("/profile" , (req , res)=>{
    res.send("Hey I am from users profile")
})

module.exports = router
