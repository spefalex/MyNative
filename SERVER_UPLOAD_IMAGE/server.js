var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io") (server);
server.listen(3000);

console.log("server run ");
io.on("connection", function(socket){


console.log("log" +socket.id);
socket.on("sendcolor", function(data){

console.log("Appli mobile says:" +data);

io.sockets.emit("server-send","solo");
});
});