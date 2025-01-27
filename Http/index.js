const http = require("http");  // Import the http module
const fs = require("fs");      // Import the fs module

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check the request URL
  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/plain" });  // Specify Content-Type for text response
    res.end("This is the Home Page");
  } else if (req.url === "/contact") {
    // Read the HTML file
    fs.readFile("index.html", "utf-8", (err, message) => {
      if (err) {
        // Log the error in the console
        console.log(err);
        // Send an error response to the client
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        // Send the file content with the correct content type
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(message);
      }
    });
  } else {
    // If the URL is not /home or /contact, send a 404 response
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

// Start the server to listen on port 3000
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
