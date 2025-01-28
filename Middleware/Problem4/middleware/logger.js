function logger(req , res , next){
    console.log("first")
    next()
    console.log("last")
}

module.exports = logger