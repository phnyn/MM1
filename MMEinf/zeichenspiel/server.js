var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);

var drawings = [];
var rdy = 0;
var count = 0;

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('New Connection: ' + socket.id);

    socket.on('ready', (cvs) => {
        drawings.push(cvs);
        rdy++;
        if(rdy == 4) {
            rdy = 0;
            io.sockets.emit('redirect');
        }
    })
    

    socket.on('drawings', () => {
        count++;
        socket.emit('combineImg', drawings);
        if(count == 4) drawings = [];
    })

}
console.log("Socket Server running");