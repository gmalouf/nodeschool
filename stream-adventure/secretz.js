var zlib = require('zlib');
var tar = require('tar');
var crypto = require('crypto');
var through = require('through');

var tarParser = tar.Parse();
tarParser.on('entry', function (entry) {
  if(entry.type === 'File') {
    var md5 = crypto.createHash('md5', { encoding: 'hex' });
    entry.pipe(md5).pipe(through(null, function() {
      this.queue(" " + entry.path + "\n");
    })).pipe(process.stdout);
  }
});

process.stdin
  .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
  .pipe(zlib.createGunzip())
  .pipe(tarParser);