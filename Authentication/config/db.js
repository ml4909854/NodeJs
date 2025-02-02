const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/authdb"


const connectDB = ()=>{
try {
    mongoose.connect(mongoUrl)
    console.log("connected to the database")
} catch (error) {
    console.log(error , "error to connect a database")
}
}

module.exports = connectDB