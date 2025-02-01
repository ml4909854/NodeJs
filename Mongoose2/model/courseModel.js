const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
   studentId :[{type:mongoose.Schema.Types.ObjectId , ref:"student"}] // this is code is for one to one relationship
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);
module.exports = mongoose.model("course", courseSchema);