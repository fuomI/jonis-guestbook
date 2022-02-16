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

