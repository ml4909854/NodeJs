const express = require("express")

const router = express.Router()

router.get("/"  , (req , res)=>{
    res.send("Hey I am from productpage")
})

router.get("/product" , (req, res)=>{
    res.send("thisis the product id")
})
module.exports = router