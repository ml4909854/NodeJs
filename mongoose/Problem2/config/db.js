const mongoose = require("mongoose")
const mongoURL = "mongodb://127.0.0.1:27017/ecommerce"

const ConnectDB = ()=>{
   mongoose.connect(mongoURL)
}

module.exports = ConnectDB;