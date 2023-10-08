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
const fs = require("fs"); // Require the 'fs' module for file operations

const server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/":
            serveHTML("views/index.html", res);
            break;
        case "/about":
            serveHTML("views/about.html", res);
            break;
        case "/contact":
            serveHTML("views/contact.html", res);
            break;
        case "/products":
            serveHTML("views/products.html", res);
            break;
        case "/subscribe":
            serveHTML("views/subscribe.html", res);
            break;
        case "/login":
            serveHTML("views/login.html", res);
            break;
        case "/register":
            serveHTML("views/register.html", res);
            break;
        default:
            serveErrorPage(res);
            break;
    }
});

// Helper function to serve HTML files
function serveHTML(fileName, res) {
    fs.readFile(fileName, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading file ${fileName}: ${err.message}`);
            serve404(res);
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        }
    });
}

// Helper function to serve a custom error page (html file)
function serveErrorPage(res) {
    fs.readFile("views/error.html", "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading error page file: ${err.message}`);
            // If the error page file is not found, serve a simple 404 page
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>404 Not Found</h1>");
            res.write("<p>The page you are looking for does not exist.</p>");
            res.end();
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        }
    });
}

server.listen(3000);
console.log("Listening on port 3000...");
