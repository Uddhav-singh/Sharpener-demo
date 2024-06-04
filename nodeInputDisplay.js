const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = querystring.parse(body);
      const userInput = postData.input || '';

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>User Input</title>
        </head>
        <body>
          ${userInput ? `<h1>${userInput}</h1>` : ''}
          <form action="/" method="post">
            <label for="input">Enter something:</label>
            <input type="text" id="input" name="input">
            <button type="submit">Submit</button>
          </form>
        </body>
        </html>
      `);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});