
require("dotenv").config
const mongoose = require("mongoose")
const mongoURL = "mongodb://127.0.0.1:27017/BlogApplication"


const connectDB = ()=>{
    try {
        mongoose.connect(mongoURL)
console.log("dataase connected!")
    } catch (error) {
        console.log("Error to connect db")
    }
}

module.exports = connectDB