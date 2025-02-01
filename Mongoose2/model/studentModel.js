const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    enrolcourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }], // this code is for many to many relationship
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

module.exports = mongoose.model("student", studentSchema);
