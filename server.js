const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const fs = require('fs');

//Parses all data coming through.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: false }));

//Middleware
app.use((req, res, next) => {
    let now = new Date().toString().slice(0, 24);
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('Cannot append to server.log file.');
    });
    next();
});

//Points to dist folder
app.use(express.static('./src'));

// All other routes return the index file
app.get('*', (req, res) => {
    return res.sendFile('/src/index.html', { root: './' });
});

// Server setup
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port:${port}`));
