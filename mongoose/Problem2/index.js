const express = require("express");
const app = express();
const ConnectDB = require("./config/db.js");
const UserModel = require("./model/userModel.js");
const userRouter = require("./controllers/userController.js")
const productRouter = require("./controllers/productController.js")
app.use(express.json());
 
app.use("/user" ,userRouter)
app.use("/product",productRouter)


const PORT = 8080;
app.listen(PORT, async () => {
  try {
    await ConnectDB();
    console.log(`server is listen on ${PORT} and connected to the database`);
  } catch (error) {
    console.log(error);
  }
});
