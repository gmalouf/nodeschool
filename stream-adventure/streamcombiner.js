var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  return combine(
    split(),
    through(groupBooksByGenre, onComplete),
    zlib.createGzip()
  );
};

var booksByGenre = [];

function groupBooksByGenre(row) {
  
  if(row.length===0) return;

  var parsedRow = JSON.parse(row);

  if(parsedRow.type === 'genre') {
    booksByGenre.push({
      name: parsedRow.name,
      books: []
    });
  } else if (parsedRow.type === 'book') {
    var genre = booksByGenre[booksByGenre.length - 1];
    genre.books.push(parsedRow.name);
  } 
}

function onComplete() {
  var self = this;
  booksByGenre.forEach(function(bg) {
    self.queue(JSON.stringify(bg)).queue('\n');
  });
  this.queue(null);
}

