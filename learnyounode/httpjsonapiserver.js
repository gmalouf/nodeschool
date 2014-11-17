var http = require('http')
var url = require('url')
//TODO Time conversions should have been in separate functions
//TODO Could have shared code and did if statement on result (checks if not null)
var server = http.createServer(function (req, res) {

  if(req.method != "GET") {
  	res.writeHead(405, { 'Allow': 'GET' })
  	return res.end()
  }

  var parsedRequest = url.parse(req.url, parseQueryString = true)
  if(parsedRequest.pathname === '/api/parsetime') {
  	var date = new Date(parsedRequest.query.iso)
  	var time = {}
  	time.hour = date.getHours()
  	time.minute = date.getMinutes()
  	time.second = date.getSeconds()
  	res.end(JSON.stringify(time))
  } else if(parsedRequest.pathname === '/api/unixtime') {
  	res.writeHead(200)
  	var time = {}
  	time.unixtime = new Date(parsedRequest.query.iso).getTime()
  	res.end(JSON.stringify(time))
  } else {
  	res.writeHead(404)
  	res.end()
  }
})
server.listen(process.argv[2])