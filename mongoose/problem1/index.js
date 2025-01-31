const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const mongoUrl = "mongodb://127.0.0.1:27017/ecommerce"; // Removed extra space

async function connectDB() {
  try {
    await Mongoose.connect(mongoUrl);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDB();

// first step is created a struturing using schema
const userSchema = new Mongoose.Schema({
  eggs: {
    type: Number,
    min: [6, "too few eggs"],
    max: 12,
  },
  bacon: {
    type: Number,
    required: [true, "why no bacon"],
  },
  drink: {
    type: String,
    enum: ["coffee", "tea"],
  },
});

// Now , we are created a blueprint Now , next we are cerated a model

const UserModel = Mongoose.model("user", userSchema);

// Now next step is add or save a data

const saveData = async () => {
  try {
    const newUser = new UserModel({
      eggs: 9,
      drink: "tea",
    });
    const savedUser = await newUser.save();
    console.log(savedUser, "User is saved");
  } catch (error) {
    console.log(error, "error to saved a new User");
  }
};
saveData();

const getUser = async () => {
  try {
    const getUser = await UserModel.find();
    console.log(getUser, "get the user");
  } catch (error) {
    console.log(error, "error to get a user");
  }
};
// getUser()

const updateUser = async () => {
  try {
    const update = await UserModel.updateOne(
      { name: "Mahesh" },
      { name: "Ankit", email: "ankit@gmail.com" }
    );
    console.log(update, "user is updated");
  } catch (error) {
    console.log(error, "error to updateUser");
  }
};
// updateUser()

const deleteUser = async () => {
  try {
    const deleteuser = await UserModel.deleteOne({ name: "Sangeeta" });
    console.log(deleteuser, "user deleted Sucesffull");
  } catch (error) {
    console.log(error, "error to delete a users");
  }
};
// deleteUser()
