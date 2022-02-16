// Import express, file system, node-fetch
const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

// Start express
const app = express();

// Declare PORT
const PORT = process.env.PORT || 5000;

// Add the body-parser module to handle form data
const bodyParser = require('body-parser');

// Enable body parser
app.use(bodyParser.urlencoded({extended: true}));




// THE ROUTES
// **********

// The default route
app.get('/', function (req, res) {
    // Default route sends index.html as response
    res.sendFile(__dirname + "/index.html");
});

// The route 404
app.get('*', function (req, res) {
    res.send("Can't find the requested page", 404);
});

// App listens PORT:
app.listen(PORT, function() {
    console.log("Server is running");
});