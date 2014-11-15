var http = require('http')
var cs = require('concat-stream')

var args = process.argv.slice(2, process.argv.length)
var results = {}

function onResult(url, response) {
  results[url] = response

  if(Object.size(results) === args.length) {
    for (var i = 0; i < args.length; i++) {
      console.log(results[args[i]])
    }      
  }  
}

var aggResponse = function(url) {
  return cs(function (data) {
    onResult(url, data.toString())
  })
}  

function call(url) {
  http.get(url, function(response) {
    response.pipe(aggResponse(url))
  })
}

call(args[0])
call(args[1])
call(args[2])

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
