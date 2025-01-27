const { deepStrictEqual } = require("assert");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/app/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "error in read data" });
    } else {
      const users = JSON.parse(data).users;
      res.send({ users });
    }
  });
});

app.post("/app/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "error in read data" });
    } else {
      const users = JSON.parse(data).users;
      const newUser = { id: Date.now(), ...req.body };
      users.push(newUser);

      fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
        if (err) {
          res.status(500).json({ message: "error in write data" });
        }
        res.json(newUser);
      });
    }
  });
});

app.put("/app/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "error in read data" });
    }
    const users = JSON.parse(data).users;
    const userIndex = users.findIndex((user) => user.id == req.params.id);
    if (userIndex === -1) {
      res.json({ error: "user not found" });
    }
    users[userIndex] = { id: Number(req.params.id), ...req.body };

    fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
      if (err) {
        res.json({ error: "error to write data" });
      } else {
        res.json(users[userIndex]);
      }
    });
  });
});

app.patch("/app/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading data" });
    } else {
      const users = JSON.parse(data).users;

      // Find user index by ID
      const userIndex = users.findIndex((user) => user.id == req.params.id);

      if (userIndex === -1) {
        // If user not found, send a 404 response
        res.status(404).json({ error: "User not found" });
      } else {
        // Update only the specified fields in the user's data
        users[userIndex] = { ...users[userIndex], ...req.body };

        // Write the updated users array back to the file
        fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
          if (err) {
            res.status(500).json({ message: "Error writing data" });
          } else {
            res.json({
              message: "User updated successfully",
              updatedUser: users[userIndex],
            });
          }
        });
      }
    }
  });
});


app.delete("/app/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.json({ message: "error in read data" });
    } else {
      const users = JSON.parse(data).users;
      // find userIndex
      const userIndex = users.findIndex((user) => user.id == req.params.id);

      // delete user
      if (userIndex === -1) {
        res.status(500).json({ err: "user not found" });
      } else {
        const deleteUser = users.splice(userIndex, 1);

        fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
          if (err) {
            res.status(500).json({ err: "error to write a data" });
          } else {
            res.json(deleteUser);
          }
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on a 3000");
});
