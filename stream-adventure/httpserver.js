var http = require('http');
var through = require('through');

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through(write)).pipe(res);
  }
  else res.end('Expected POST message');
});
server.listen(process.argv[2]);

function write(buf) { this.queue(buf.toString().toUpperCase()); }