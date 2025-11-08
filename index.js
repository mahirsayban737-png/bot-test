const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bot test is alive.\n');
});

server.listen(port, () => {
  console.log(`--- TEST SERVER RUNNING ON PORT ${port} ---`);
  setInterval(() => {
    console.log(`Heartbeat: I am still alive. ${new Date().toLocaleTimeString()}`);
  }, 30000);
});
