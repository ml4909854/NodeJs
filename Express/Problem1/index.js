const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
// when we are post a data it is shown undefinde that why we are use a middleware
// app. get api
app.get("/api/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(200).json({ error: "error in read data" });
    } else {
      const users = JSON.parse(data).users;
      res.status(200).send(users);
    }
  });
});

// app.post api
app.post("/api/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ error: "error in read data" });
    } else {
      const users = JSON.parse(data).users;
      const newUser = { id: Date.now(), ...req.body };
      console.log(newUser);
      users.push(newUser);

      fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
        if (err) {
          res.status(404).json({ message: "error to write a data" });
        } else {
          res.status(200).json(newUser);
        }
      });
    }
  });
});

// app.put

app.put("/api/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ error: "error in read data" });
    } else {
      const users = JSON.parse(data).users;

      const userIndex = users.findIndex((user) => user.id == req.params.id);
      if (userIndex === -1) {
        res.status(404).send("user not found!");
      }
        users[userIndex] = {id : Number(req.params.id)  , ...req.body}
      

      fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
        if (err) {
          res.status(404).json({ message: "error to write a data" });
        } else {
          res.status(200).json(users[userIndex]);
        }
      });
    }
  });
});

// patch method 
app.patch("/api/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ error: "error in read data" });
    } else {
      const users = JSON.parse(data).users;

      const userIndex = users.findIndex((user) => user.id == req.params.id);
      if (userIndex === -1) {
        res.status(404).send("user not found!");
      }
        users[userIndex] = {...users[userIndex]  , ...req.body}
      

      fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
        if (err) {
          res.status(404).json({ message: "error to write a data" });
        } else {
          res.status(200).json(users[userIndex]);
        }
      });
    }
  });
});


app.delete("/api/users/:id", (req, res) => {
    fs.readFile("db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(404).json({ error: "error in read data" });
      } else {
        const users = JSON.parse(data).users;
  
        const userIndex = users.findIndex((user) => user.id == req.params.id);
        if (userIndex === -1) {
          res.status(404).send("user not found!");
        }
         const deleteUser = users.splice(users[userIndex] , 1)
       console.log(deleteUser)
        
  
        fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
          if (err) {
            res.status(404).json({ message: "error to write a data" });
          } else {
            res.status(200).json({message:"user deleted sucessfully"});
          }
        });
      }
    });
  });
  
// app delete method 


 app.listen(8000, () => {
  console.log("server is running on port 8000");
});
