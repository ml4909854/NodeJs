

const jwt = require("jsonwebtoken")
const UserModel = require("../model/UserModel")
const Auth = async(req , res , next)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            res.status(401).json({message:"No token found!"})
        }
        const decoded = jwt.verify(token , "masai")
    
        const findUser = await UserModel.findById(decoded._id)
        if(!findUser){
            res.status(404).json({message:"No user Found!"})
        }
        req.user = findUser
        next()
    } catch (error) {
        
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token!" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired!" });
        }

        console.error("Authentication error:", error);
        res.status(500).json({ message: "Error during authentication!" });
    }
}

module.exports = Auth