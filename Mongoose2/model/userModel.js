const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    // one to many relationship
    ordersId :[{type:mongoose.Schema.Types.ObjectId , ref:"product"}],
    // one to one relationship
    ProfileId: { type: mongoose.Schema.Types.ObjectId, ref: "profile", required: true },
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

module.exports = mongoose.model("user", userSchema);