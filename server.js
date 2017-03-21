const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

//Points to dist folder
app.use(express.static('./skil4/app'));

// All other routes return the index file
app.get('*', (req, res) => {
        return res.sendFile('index.html', { root: './' });
});

// Server setup
const port = process.env.PORT || 4200;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port:${port}`));