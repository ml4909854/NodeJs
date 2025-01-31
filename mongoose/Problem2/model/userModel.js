const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    age: {
      type: Number,
      min: [5, "Age must be at least 5 years"],
      max: [120, "Age must be less than 120 years"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    isMarried: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey:false},
  { timestamps: true } 
);

 
module.exports = mongoose.model("user", userSchema);