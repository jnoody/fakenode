/*globals require, process, console*/

var http = require('http'),
    url = require('url'),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;

var server = http.createServer(function (req, res) {
    'use strict';

    var uri = url.parse(req.url).pathname,
        filename = path.join(process.cwd(), uri);

    if (req.url === '/') {
        res.writeHead(599, {
            'Content-Type': 'text/html'
        });
        res.end('some error');
    } else {
        fs.exists(filename, function (exists) {
            if (!exists) {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("404 Not Found\n");
                res.end();
                return;
            }
         
            if (fs.statSync(filename).isDirectory()) {
                filename += '/index.html';
            }
         
            fs.readFile(filename, "binary", function (err, file) {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.write(err + "\n");
                    res.end();
                    return;
                }
            
                res.writeHead(200);
                res.write(file, "binary");
                res.end();
            });
        });
    }

});

server.listen(8080, '127.0.0.1');
console.log('Server running at 127.0.0.1:8080');
