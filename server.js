var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

http.listen(process.env.PORT || 1825, function() {
    console.log("Server running !");
});