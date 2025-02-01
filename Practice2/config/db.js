const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/practice"

const connectDB = ()=>{
    try {
       mongoose.connect(mongoUrl)
    } catch (err) {
        console.log(err)
    }
}
module.exports = connectDB