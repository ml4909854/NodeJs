const express = require("express");
const app = express();

function logger(req ,res , next){
    console.log("first logger")
    next()
    console.log("first logger")

}
function logger2(req ,res , next){
    console.log("second logger")
    next()
    console.log("second logger")
}
app.use(logger , logger2)

app.use("/" , (req , res, next)=>{
    console.log("third middlwware")
    next()
    console.log("third middleware")
})
app.get("/", (req, res) => {
    console.log("Hello User!")
  res.send("Hello User!");
});

app.get("/users" , (req , res)=>{
    console.log("This is the user's page")
    res.send("Hi from users")
})
app.listen(3000, () => {
  console.log("server is running on a port 3000");
});
