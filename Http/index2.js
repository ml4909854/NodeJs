const http = require("http");

const server = http.createServer((req, res) => {
  // Check the request URL
  if (req.url === "/home") {
    res.statusCode(200).end("This is the home page");
  } else if (req.url === "/contact") {
    res.statusCode(200).end("This is the contact page");
  } else {
    // Catch-all for any unknown routes
    res.statusCode(404).end("No page found");
  }
});

// Start the server to listen on port 3000
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
