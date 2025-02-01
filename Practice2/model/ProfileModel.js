const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
})

module.exports = mongoose.model("profile" , profileSchema)