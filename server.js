const path = require('path');
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;
const server = http.createServer(handleRequest);
server.listen(port, () => console.log(`Server running on port:${port}`));

function handleRequest(req, res) {
  let pathname = req.url;
  
  if (pathname == '/') {
    pathname = '/skil4/app/index.html';
  }
  
  let ext = path.extname(pathname);

  let typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css',
    '.tff':  'font/truetype'
  };

  let contentType = typeExt[ext] || 'text/plain';

  fs.readFile(__dirname + pathname,
    (err, data) => {
      if (err) {
        res.writeHead(500);
        console.log(err);
        return res.end('Error loading ' + pathname);
      }

      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}
