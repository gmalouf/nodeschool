var fdm = require('./filterdirmodule')

fdm(process.argv[2], process.argv[3], function(err, items) {
  if(err)
    console.log(err)

  items.forEach(function(element) {
    console.log(element)
  })
})
