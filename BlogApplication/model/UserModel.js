

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   username:{type:String , required:true},
    password :{type: String , required:true},
    role:{type:String , required:true , enum:["author" , "admin"]}
})

module.exports = mongoose.model("user" , UserSchema)