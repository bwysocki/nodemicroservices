// We need the "http" module for HTTP-related
// code.
var http = require('http');

// Creates the server instance, and sets of the
// callback function that's called on every request
// event for us.
var server = http.createServer((req, res) => {

  function work(n) {
    var i = 0;
    while (++i < n * n) {}
    return i;
  }

  function workInTick(n, i, res) {
    var chunk = 50000;
    var i = i || 0;
    setImmediate(() => { //process.nextTick vs setTimeout
      while (++i < n * n) {
        if (i > chunk) break;
      }
      if (i < n * n) {
        workInTick(n, i + chunk - 1, res);
        return
      }
      res.end('slow' + i);
    });

  }

  // The response header is always going to be plain
  // text.
  res.setHeader('Content-Type', 'text/plain');

  // If the request URL is "hello" or "world", we
  // respond with some text immediately. Otherwise,
  // if the request URL is "/", we simulate a slow
  // response by using "setTimeout()" to finish the
  // request after 5 seconds.
  if (req.url === '/hello') {
      res.end('Hello');
  } else if (req.url === '/world') {
      res.end('World');
  } else if (req.url === '/slowwork') {
      var i = work(100000);
      res.end('Slow' + i);
  } else if (req.url === '/slow') {
      workInTick(1000000, 0, res);
  } else {
      setTimeout(() => {
          res.end('Hello World');
      }, 5000);
  }
});

// Starts the server.
server.listen(8081);
console.log('listening at http://localhost:8081');
