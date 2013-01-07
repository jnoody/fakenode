var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(599, {
        'Content-Type': 'text/plain'
    });
    res.end('some error');
});

server.listen(8080, '127.0.0.1');
console.log('Server running at 127.0.0.1:8080');
