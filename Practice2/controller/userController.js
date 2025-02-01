const express = require("express");
const UserModel = require("../model/UserModel.js");
const router = express.Router();

// post user
router.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.json(error);
  }
});

// get the data

router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const getUser = await UserModel.find(filter);
    res.json(getUser);
  } catch (error) {
    res.json(error);
  }
});

// get a separate user

router.get("/:id", async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id).populate(["orderId" , "profileId"]);
    res.json(getUser);
  } catch (error) {
    res.json(error);
  }
});

// updata a user
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateUser);
    res.json(updateUser);
  } catch (error) {
    res.json(error);
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await UserModel.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
