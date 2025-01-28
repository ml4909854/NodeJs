const express = require("express")
// 
const router = express.Router()

router.get("/" , (req , res)=>{
    console.log(`Hey I am from users ${req.request}`)
    res.send(`Hey I am from users ${req.request}`)
})

module.exports = router