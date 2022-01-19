var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);

var drawings = [];
var rdy = 0;
var count = 0;
var players = [];
var time;

app.use(express.static('public'));
app.get('/', function(req, res){
    res.redirect('/index.html');
});

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('New Connection: ' + socket.id);

    socket.on("host", () => {
        count++;
        if(count == 1) {
            socket.emit("host")
        } else {
            socket.emit("notHost");
        }
    })

    socket.on("playerdata", (playerdata) => {
        players.push(playerdata);
    })

    socket.on("getPlayers", () => {
        socket.emit("getCurrentPlayer", players[count-1]);
        io.sockets.emit("getPlayers", players);
        if(count == 4) {
            count = 0;
            assignRandomBodypart();
        }
    })


    socket.on("kickHelper", player => {
        socket.broadcast.emit("kickHelper", player);
    })

    socket.on("kickMe", () => {
        console.log("kicked" +socket.id);
        socket.disconnect();
    })

    socket.on("start", t => {
        time = t;
        io.sockets.emit('redirect');
    })

    socket.on("getPlayersWithBodyPartsAndTime", () => {
        let playersAndTime = {
            players: players,
            time: time
        }
        socket.emit("getPlayersWithBodyPartsAndTime", playersAndTime);
    })

    socket.on("playerIsRdy", (player) => {
        player.currentPlayer = false;
        socket.broadcast.emit("updateOnPlayer", player);
    })

    socket.on('ready', (cvs) => {
        drawings.push(cvs);
        rdy++;
        if(rdy == 4) {
            rdy = 0;
            drawings = orderCvsByBodyparts();
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

/**
 * Player prototype
 * @param {string} name - username of player
 * @param {bool} currentPlayer - if the player is the current player (owner of the window)
 * @param {bool} isHost - if the player is a host
 * @param {string} bodypart - the bodypart to draw
 * @param {bool} ready - if the player has finished drawing
 */
function Player(name, currentPlayer, isHost, bodypart, ready){
    this.name = name;
    this.currentPlayer = currentPlayer;
    this.isHost = isHost;
    this.bodypart = bodypart;
    this.ready = ready;
}


function assignRandomBodypart() {
    let bodyparts = ["head", "upper body", "lower body", "feet"];
    for (let i = 0; i<players.length; i++){
        let random = Math.floor(Math.random()*bodyparts.length);
        players[i].bodypart = bodyparts[random];
        bodyparts.splice(random, 1);
    }
}

function orderCvsByBodyparts() {
    let temp = ["","","",""];
    for(let i = 0; i<drawings.length; i++) {
        let player = getPlayerByName(drawings[i].player)
        switch (player.bodypart){
            case "head":
                temp[0] = drawings[i].cvs;
                break;
            case "upper body":
                temp[1] = drawings[i].cvs;
                break;
            case "lower body":
                temp[2] = drawings[i].cvs;
                break;
            case "feet":
                temp[3] = drawings[i].cvs;
                break;
        }
    }
    return temp;
}

function getPlayerByName(name) {
    let player;
    for (let i = 0; i<players.length; i++) {
        if (players[i].name === name) {
            player = players[i];
        }
    }
    return player;
}
