var duplexer = require('duplexer');
var Writable = require('stream').Writable;

module.exports = function(counter) {
    var countries = {};
    var capturer = Writable({objectMode: true});
    capturer._write = function(chunk, enc, next) {
        countries[chunk.country] = (countries[chunk.country] || 0) + 1;
        next();
    }
    capturer.on('finish', function() { counter.setCounts(countries); })
    return duplexer(capturer, counter);
};