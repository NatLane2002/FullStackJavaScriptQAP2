/*************************
 * File Name: app.js
 * Purpose: Create a web server that responds to different routes, etc, etc. For QAP2.
 *
 * Created Date: 2023-10-08
 * Authors:
 *  1. Nathaniel Lane
 *************************/
global.DEBUG = true;

const http = require("http");

const server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Home Page</h1>");
            console.log("Home Page");
            break;
        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>About Page</h1>");
            console.log("About Page");
            break;
        case "/contact":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Contact Page</h1>");
            console.log("Contact Page");
            break;
        case "/products":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Products Page</h1>");
            console.log("Products Page");
            break;
        case "/subscribe":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Subscribe Page</h1>");
            console.log("Subscribe Page");
            break;
        case "/login":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Login Page</h1>");
            console.log("Login Page");
            break;
        case "/register":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Register Page</h1>");
            console.log("Register Page");
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>Page Not Found</h1>");
            res.write("<p>Sorry, the page you are looking for does not exist.</p>");
            console.log("404 Page Not Found");
            break;
    }
    res.end();
});

server.listen(3000);

console.log("Listening on port 3000...");
