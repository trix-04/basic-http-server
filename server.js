const http = require('http');
const fs = require('fs');

const PORT = 3000;

function sendHtml(res, status, html) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function serveFile(res, filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return sendHtml(res, 500, '<h1>500 - Server Error</h1>');
    }
    sendHtml(res, 200, data);
  });
}

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  const url = req.url.split('?')[0].split('#')[0];

  if (url === '/' || url === '/index.html') {
    return serveFile(res, 'index.html');
  }

  if (url === '/About') {
    return serveFile(res, 'about.html');
  }

  if (url === '/Contact') {
    return serveFile(res, 'contact.html');
  }

  if (url === '/style.css') {
  fs.readFile('style.css', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('CSS not found');
    }
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
    res.end(data);
    });
  return;
    }

  return sendHtml(
    res,
    404,
    `<h1>404 - Not Found</h1>
     <p>Try <a href="/">Home</a>, <a href="/About">About</a>, or <a href="/Contact">Contact</a>.</p>`
  );
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
