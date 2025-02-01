const exprress = require("express")
const app = exprress()
const fs = require("fs")
const { json } = require("stream/consumers")
app.use(exprress.json())

app.get("/user" , (req , res)=>{
    fs.readFile("db.json" , "utf-8" , (err , data)=>{
        if(err){
            res.send("error in read data")
        }
        const users = JSON.parse(data).users
        res.json(users)
    })
})

// post
app.post("/user" , (req ,res)=>{
    fs.readFile("db.json" , "utf-8" , (err , data)=>{
        if(err){
            res.send("error in read data")
        }
        const users = JSON.parse(data).users
        const newUser = {id:Date.now() , ...req.body}
        users.push(newUser)

        fs.writeFile("db.json" , JSON.stringify({users}) , (err)=>{
            if(err){
                res.send("error to write data")
            }
            res.json({message:"user added sucessfully" , newUser:newUser})
        })
    })
})

// put

app.put("/user/:id" , (req ,res)=>{
    fs.readFile("db.json" , "utf-8" , (err , data)=>{
        if(err){
            res.send("error in read data")
        }
        const users = JSON.parse(data).users
       
        const userIndex = users.findIndex((user)=>user.id == req.params.id)
        if(userIndex === -1){
            res.send("user not found")
        }
        users[userIndex] = {id:Number(req.params.id) , ...req.body}

        fs.writeFile("db.json" , JSON.stringify({users}) , (err)=>{
            if(err){
                res.send("error to write data")
            }
            res.json(users[userIndex])
        })
    })
})


// patch


app.patch("/user/:id" , (req ,res)=>{
    fs.readFile("db.json" , "utf-8" , (err , data)=>{
        if(err){
            res.send("error in read data")
        }
        const users = JSON.parse(data).users
       
        const userIndex = users.findIndex((user)=>user.id == req.params.id)
        if(userIndex === -1){
            res.send("user not found")
        }
        users[userIndex] = {...users[userIndex] , ...req.body}

        fs.writeFile("db.json" , JSON.stringify({users}) , (err)=>{
            if(err){
                res.send("error to write data")
            }
            res.json(users[userIndex])
        })
    })
})

// delete



app.delete("/user/:id" , (req ,res)=>{
    fs.readFile("db.json" , "utf-8" , (err , data)=>{
        if(err){
            res.send("error in read data")
        }
        const users = JSON.parse(data).users
       
        const userIndex = users.findIndex((user)=>user.id == req.params.id)
        if(userIndex === -1){
            res.send("user not found")
        }

        // users[userIndex] = {...users[userIndex] , ...req.body}
        const deleteUser = users.splice(users[userIndex] , 1)

        fs.writeFile("db.json" , JSON.stringify({users}) , (err)=>{
            if(err){
                res.send("error to write data")
            }
            res.json(deleteUser)
        })
    })
})

app.listen(5000  , ()=>{
    console.log("server is running")
})