// console.log("Hello");
// let pr = (a,b)=>  a*b;

// console.log(pr(4,5))

// function delayLog(message, delay) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(message);
//             resolve();
//         }, delay);
//     });
// }

// async function printSequence() {
//     console.log('a');
//     console.log('b');
//     await delayLog('c', 3000); // No delay, but we need it to be in sequence
//     await delayLog('d', 0); // No delay, but we need it to be in sequence
//     console.log('e');
// }

// printSequence();

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Uddhav');
  console.log('Uddhav');
});

server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});