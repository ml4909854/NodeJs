// The fs module in Node.js is a built-in module that allows developers to interact with the file system. It provides functions to read, write, update, delete, and perform other operations on files and directories.

const fs = require("fs");

// first to write file

fs.writeFile("text.txt", "Hello world!", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Data writtened successfully");
  }
});

// second step to read a file

fs.readFile("./text.txt", "utf-8", (err, msg) => {
 if(err){
    console.log(err)
 }else{
    console.log(msg)
 }
});

// third step to apped a data in a file

fs.appendFile("text.txt" , "Mahesh Kumar"  ,(err , msg)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Data append successfully")
    }
})

// dele file with the help of fs module
// fs.unlink("text.txt" , (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("file deleted successfully")
//     }
// })