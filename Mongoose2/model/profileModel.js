const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: Number,
    isMarried: { type: Boolean, default: false },
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

module.exports = mongoose.model("profile", profileSchema);