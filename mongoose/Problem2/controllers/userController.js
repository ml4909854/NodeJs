const express = require("express")
const UserModel = require("../model/userModel")
const router = express.Router()

// add a New User

router.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ message: "user is posted", User: savedUser });
  } catch (error) {
    res.json({message:"error in code" , Err:error })
  }
});

// find a newUser or get a newUser and find user by querrries
router.get("/" , async(req , res)=>{
  try {
    const filter = req.query
    console.log(filter)
    const getUser = await UserModel.find(filter)
    res.status(201).json({User:getUser})
  } catch (error) {
    res.json({message:"error to getUser" , error:error})
  }
})

// find a single user

router.get("/:id" , async(req , res)=>{
    try {
        const id = req.params.id
        const singleUser = await UserModel.findById(id)
        res.status(200).json({singleUser:singleUser})
    } catch (error) {
        res.status(404).json({error:"user Not found!"})
    }
})


// how to update a user by its id

router.patch("/:id" ,async (req , res)=>{
   try {
    const id = req.params.id
    const updateUser = await UserModel.findByIdAndUpdate(id , req.body ,{
        new :true
    })
    res.status(200).json({updateUser:updateUser})
   } catch (error) {
res.status(404).json({error:error.message})
   }
})

// Delete a User and how to delete a user

router.delete("/:id" , async(req , res)=>{
    try {
        const id = req.params.id
        const deleteUser = await UserModel.findByIdAndDelete(id)
        res.status(200).json({deleteUser:deleteUser})
    } catch (error) {
        res.status(404).json({erorr:"User not deleted"})
    }
})

module.exports = router