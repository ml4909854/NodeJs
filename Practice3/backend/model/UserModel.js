

const mongoose = require("mongoose")
const role = require("../constants/role")

const UserSchema = new mongoose.Schema({
    username:{type:String , required:true},
    password:{type:String , required:true},
    role:{type:String  , enum:[role.admin , role.author] , required:true}
})

module.exports = mongoose.model("user" , UserSchema)