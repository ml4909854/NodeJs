const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String, required:true}, 
    orderId:[{type:mongoose.Schema.Types.ObjectId , ref:"product" , required:true}],  // this code for the many to many relationship this is called the many to many relationship of the code
    profileId:{type:mongoose.Schema.Types.ObjectId , ref:"profile" , required:true} // one to one relationship
},{
    versionKey:false,
    timestamps:true
}
)

module.exports = mongoose.model("user" , userSchema)