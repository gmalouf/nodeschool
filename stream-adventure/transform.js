var through = require('through');

process.stdin.pipe(through(write)).pipe(process.stdout);


function write(buf) { this.queue(buf.toString().toUpperCase()); }