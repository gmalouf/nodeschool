var fs = require('fs')
var path = require('path')

var expectedExt = "."+process.argv[3]

function matchesExt(file) {
    return path.extname(file) == expectedExt
}

fs.readdir(process.argv[2], function(err, items){
    items.filter(matchesExt).forEach(function(element) {
      console.log(element)
    })
})
