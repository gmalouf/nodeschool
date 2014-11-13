var fs = require('fs')

fs.readFile(process.argv[2], reportLineCount)

function reportLineCount(err, buffer) {
  var lineCount = buffer.toString().split('\n').length-1

  console.log(lineCount)
}

