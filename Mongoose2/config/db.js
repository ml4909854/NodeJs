const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://ml4909854:mahesh12345@cluster0.1kfsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const ConnectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

module.exports = ConnectDB;