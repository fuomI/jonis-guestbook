// Import express, file system, node-fetch
const express = require('express');
const fs = require('fs');

// Start express
const app = express();

// Declare PORT
const PORT = process.env.PORT || 5000;

// Add the body-parser module to handle form data
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');

// Enable body parser
app.use(bodyParser.urlencoded({extended: true}));

// Serve static content from public dir
app.use(express.static('public'));

// THE ROUTES
// **********

// The default route
app.get('/', function (req, res) {
    // Default route sends index.html as response
    res.sendFile(__dirname + "/public/pages/index.html");
});

// The guestbook route
app.get('/guestbook', function (req, res) {

    // Load guestbook data
    let data = require('./guestbookData.json');

    // Get header and navbar
    let guestbookContent = fs.readFileSync(__dirname + '/public/pages/guestbook.html', (err) => {
        if (err) throw err;
    });

    // Transform to header and navbar html to string
    let contentString = guestbookContent.toString();

    // Add table with data parsed into it
    contentString += '<table class="pure-table" id="guestbook">';
    contentString += '<thead>';
    contentString += '<tr>';
    contentString += '<th>#</th>';
    contentString += '<th>Name</th>';
    contentString += '<th>Country</th>';
    contentString += '<th>Message</th>';
    contentString += '</tr>';
    contentString += '</thead>';
    contentString += '<tbody>';

    for (let i = 0; i < data.length; i++) {
        contentString += '<tr>';
        contentString += '<td>' + data[i].id + '</td>';
        contentString += '<td>' + data[i].username + '</td>';
        contentString += '<td>' + data[i].country + '</td>';
        contentString += '<td>' + data[i].message + '</td>';
        contentString += '</tr>';
    }

    contentString += '</tbody>';
    contentString += '</table>';

    // Add footer
    let footer = fs.readFileSync(__dirname + '/public/pages/footer.html', (err) => {
        if (err) throw err;
    });

    let footerContent = footer.toString();

    contentString += footerContent;
    contentString += '</body>';

    // Add responsive navibar script
    let naviScript = fs.readFileSync(__dirname + '/public/js/responsiveNavi.js', (err) => {
        if (err) throw err;
    });

    let naviString = naviScript.toString();

    contentString += '<script>';
    contentString += naviString;
    contentString += '</script>'
    contentString += '</html>';

    // Send header, navbar, and table with the data as response
    res.send(contentString);
});

// New message -route
app.get('/newmessage', function (req,res) {

    // Get header and navbar
    let content = fs.readFileSync(__dirname + '/public/pages/newmessage.html', (err) => {
        if (err) throw err;
    });

    // Transform to string, so it can be sent to browser
    let contentString = content.toString();

    // Send all content
    res.send(contentString);
})

// New message (post)
app.post('/newmessage', function (req, res) {

    // Load guestbook data from file
    let data = require('./guestbookData.json');

    // Read content to variable
    let content = fs.readFileSync(__dirname + '/public/pages/newmessage.html', (err) => {
        if (err) throw err;
    });

    // Transform content to string
    let contentString = content.toString();

    // Check if inputs are empty
    if (req.body.name === "" ||
    req.body.country === "" ||
    req.body.message === "") {

        contentString += "<p id='errortxt'>Sorry but you can't leave any of the fields empty.</p>"
        res.end(contentString);
        return;
    }
    else {
    // Create new JSON object and add it
    data.push( {
        "id": (data.length+1),
        "username": req.body.name,
        "country": req.body.country,
        "date": Date(),
        "message": req.body.message
    });
    }
    // Conver the JSON object to string
    let jsonStr = JSON.stringify(data);

    // Save all data to the JSON file
    fs.writeFile('guestbookData.json', jsonStr, (err) => {
        if (err) throw err;
    });

    // Redirect user to the guestbook
    res.redirect('/guestbook');
});

// /ajaxmessage -route
app.get('/ajaxmessage', function (req,res) {

    // Send file (ajaxmessage.html) as response
    res.sendFile(__dirname + '/public/pages/ajaxmessage.html');
});

// /guestbookdata -route
app.post('/guestbookdata', function (req,res) {

    let data = require('./guestbookData.json');

    let contentString = "";

    // Check if inputs are empty
    if (req.body.name === "" ||
    req.body.country === "" ||
    req.body.message === "") {

        contentString = "<p id='errortxt'>Sorry but you can't leave any of the fields empty.</p>"
        res.end(contentString);
        return;
    }
    else {
    // Create new JSON object and add it
    data.push( {
        "id": (data.length+1),
        "username": req.body.name,
        "country": req.body.country,
        "date": Date(),
        "message": req.body.message
    });
    }

    // Convert the JSON to string
    let jsonStr = JSON.stringify(data);

    // Save all data to the file guestbookData.json
    fs.writeFile('guestbookData.json', jsonStr, (err) => {
        if (err) throw err;
    });

    // Add table with data parsed into it
    contentString += '<table class="pure-table" id="guestbook">';
    contentString += '<thead>';
    contentString += '<tr>';
    contentString += '<th>#</th>';
    contentString += '<th>Name</th>';
    contentString += '<th>Country</th>';
    contentString += '<th>Message</th>';
    contentString += '</tr>';
    contentString += '</thead>';
    contentString += '<tbody>';

    for (let i = 0; i < data.length; i++) {
        contentString += '<tr>';
        contentString += '<td>' + data[i].id + '</td>';
        contentString += '<td>' + data[i].username + '</td>';
        contentString += '<td>' + data[i].country + '</td>';
        contentString += '<td>' + data[i].message + '</td>';
        contentString += '</tr>';
    }

    contentString += '</tbody>';
    contentString += '</table>';

    // Send the table with data parsed into it as response
    res.send(contentString);
});

// The route 404
app.get('*', function (req, res) {
    res.status(404).send("Can't find the requested page");
});

// App listens PORT:
app.listen(PORT, function() {
    console.log("Server is running");
});