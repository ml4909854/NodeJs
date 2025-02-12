const jwt = require("jsonwebtoken")
const blackList = require("../blackList")

const isAuthenticated = (req ,res ,next)=>{

    try {
        const token = req.headers.auth.split(" ")[1]
        if(blackList.has(token)){
        res.status(401).send("Your are loged out! please login again to get a token")
        }
        const decoded = jwt.verify(token , "acessMasai")
        console.log(decoded)
        console.log(decoded._id)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({Error:"Invalid token Or Expired Toke"})
    }
}

module.exports = isAuthenticated