// console.log("Hello");


const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Uddhav');
  console.log('Uddhav');
});

server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});