var http = require('http')
var cs = require('concat-stream')

var print = cs(function (data) {
  var result = data.toString()
  console.log(result.length)
  console.log(result)
})

http.get(process.argv[2], function(response) {
  response.pipe(print)
})


