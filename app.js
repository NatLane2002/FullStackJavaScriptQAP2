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
const EventEmitter = require('events');

// Create a new event emitter
const myEmitter = new EventEmitter();

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
            serveErrorPage(res);
        } else {
            if (fileName != "views/index.html") {
                myEmitter.emit('notHomeRouteAccessed', `The route ${fileName} was accessed - this is not the home route.`);
            }
            myEmitter.emit('httpStatus', 200);
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
            myEmitter.emit('httpStatus', 404);
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        }
    });
}

// Event emitter for HTTP status codes
// This event is emitted to capture and log HTTP status codes generated during server responses. It provides visibility into the status of HTTP requests, allowing you to monitor and record the outcome of each request. This is useful for debugging and troubleshooting.
myEmitter.on('httpStatus', (statusCode) => {
    console.log(`HTTP Status code: ${statusCode}`);
});

// Event emitter for routes that are not the home route
// This event is emitted when a client accesses a route that is not the home route. It provides visibility into the routes that are being accessed. This is useful for debugging and troubleshooting.
myEmitter.on('notHomeRouteAccessed', (message) => {
    console.warn(`Message: ${message}`);
});

// Start the server
server.listen(3000);
console.log("Listening on port 3000...");
