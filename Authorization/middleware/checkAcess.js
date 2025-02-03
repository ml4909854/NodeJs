const checkAcess = (role)=>{
    return (req , res , next)=>{
        if(role === req.user.role){
            next()
        }else{
            res.status(401).send("you are not a valid user")
        }
    }
}

module.exports = checkAcess