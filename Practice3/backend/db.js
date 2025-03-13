

const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/practice4"


const connectDB =async ()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log("database is connected")
    } catch (error) {
        console.log("error to connect the database")
    }
}

module.exports = connectDB