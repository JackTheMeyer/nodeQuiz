var http = require('http');
var file_system = require("fs");
var url = require('url');
var events = require('events');

file_system.readFile('index.html', function(err, data) {
    if (err) throw err;
    indexData = data;
})

file_system.readFile('style.css', function(err, data) {
    if (err) throw err;
    styleCSS = data;
})

function writeCSS(req, res) {
    if(/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())){
        sendFileContent(res, req.url.toString().substring(1), "text/css");
     }
     function sendFileContent(res, fileName, contentType){
        file_system.readFile(fileName, function(err, data){
          if(err){
            res.writeHead(404);
            res.write("Not Found!");
          }
          else{
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            console.log('CSS Written');
          }
         // response.end();
        });
      }
}

function writeIndex(req, res) {
    if(req.url ==="/index") {
        file_system.readFile("index.html", function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            console.log('index accessed');
           // writeCSS(req, res, (function (err, data) {
             //   console.log('css wrote tho');
            //}));
        });
    } else {
        res.writeHead(200 , {'Content-Type': 'text/html'});
        res.write('<p> Hey There!</b><br /> THis is the default response. Requested URL is: ' + req.url);
        res.end();
    }
}

 http.createServer(function (req, res) {
    //writeIndex(req, res, (function(err, data){
        //if (err) throw err;
        //writeIndex(req, res);
    if(req.url ==="/index") {
        file_system.readFile("style.css", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data, function(err, data) {
                console.log("CSS writeen Succesfully");
            });
            file_system.readFile("index.html", function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data, function(err, data) {
                    console.log('index accessed');
                });
                file_system.readFile('menu.html', function(err, data) {
                    res.write(data, function(err, data) {
                    console.log("menu written");
                    });
                    file_system.readFile('frontpage.html', function(err, data) {
                        res.write(data, function(err, data){
                        console.log("Front Page written");
                        });
                        res.end();
            });
        });
    });
});
    } else {
        res.writeHead(200 , {'Content-Type': 'text/html'});
        res.write('<p> Hey There!</b><br /> THis is the default response. Requested URL is: ' + req.url);
        res.end();
}

}).listen(8080);
