var fs = require('fs')
var path = require('path')

module.exports = function (dir, ext, callback) {
  fs.readdir(dir, function(err, items) {
    if(err) 
      return callback(err)
    
    var filteredItems = items.filter(function(file) { return path.extname(file) == "."+ext })
    callback(null, filteredItems)
  })
}
