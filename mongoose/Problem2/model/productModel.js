const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
    },
    quantity: Number,
    size:{
        type:String,
        required:true,
        enum:["large" , "medium" , "small"]
    }
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
