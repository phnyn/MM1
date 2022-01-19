var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);

/**
 * array where the drawings of each player is saved
 */
var drawings = [];
/**
 * how many players are ready
 */
var rdy = 0;
/**
 * how many users are connected
 */
var count = 0;
/**
 * array where each player object is saved
 */
var players = [];
/**
 * the time that has been set in the settings
 */
var time;

// server serves the static folder 'public'
app.use(express.static('public'));

//starting page is set to index.html when connecting to website
app.get('/', function(req, res){
    res.redirect('/index.html');
});

// Socket
io.sockets.on('connection', newConnection);
function newConnection(socket) {

    console.log('New Connection: ' + socket.id);

    //assigns the user as host or server. first user that connects to website will be host. the following users will be invited users.
    socket.on("host", () => {
        count++;
        if(count == 1) {
            socket.emit("host")
        } else {
            socket.emit("notHost");
        }
    })

    //when a user enters the lobby his data is saved in the players array
    socket.on("playerdata", (playerdata) => {
        players.push(playerdata);
    })

    //get function for when a client wants to get all the players. when 4 players are connected to the lobby each player gets a random bodyparts assigned
    socket.on("getPlayers", () => {
        socket.emit("getCurrentPlayer", players[count-1]);
        io.sockets.emit("getPlayers", players);
        if(count == 4) {
            count = 0;
            assignRandomBodypart();
        }
    })

    //doesn't work, supposed to be used to kick player
    socket.on("kickHelper", player => {
        socket.broadcast.emit("kickHelper", player);
    })
    //doesn't work, supposed to be used to kick player
    socket.on("kickMe", () => {
        console.log("kicked" +socket.id);
        socket.disconnect();
    })

    //sets time to t
    socket.on("setTime", t => {
        time = t;
    })

    //gets time from server
    socket.on("getTime", () => {
        socket.emit("setTime", time);
    })

    //signals to all connected clients that the game has started and redirects them and sets the time to t
    socket.on("start", t => {
        time = t;
        io.sockets.emit('redirect');
    })

    //gives the client an object where the time and players are being sent
    socket.on("getPlayersWithBodyPartsAndTime", () => {
        let playersAndTime = {
            players: players,
            time: time
        }
        socket.emit("getPlayersWithBodyPartsAndTime", playersAndTime);
    })

    //signals the other users when a player is ready when drawing so the display of the bodyparts on the right side is being updated
    socket.on("playerIsRdy", (player) => {
        player.currentPlayer = false;
        socket.broadcast.emit("updateOnPlayer", player);
    })

    //user signals the server he is ready and sends the server its drawing. drawing is saved in the drawings array and when 4 players are ready
    //the server redirects all users to the final page where the drawings of all the players are
    socket.on('ready', (cvs) => {
        drawings.push(cvs);
        rdy++;
        if(rdy == 4) {
            rdy = 0;
            drawings = orderCvsByBodyparts();
            io.sockets.emit('redirect');
        }
    })

    //gets the drawings from the server
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

/**
 * auxillary function to randomly assign a random bodypart to each player in the players array
 */
function assignRandomBodypart() {
    let bodyparts = ["head", "upper body", "lower body", "feet"];
    for (let i = 0; i<players.length; i++){
        let random = Math.floor(Math.random()*bodyparts.length);
        players[i].bodypart = bodyparts[random];
        bodyparts.splice(random, 1);
    }
}

/**
 * auxillary function to order the drawing array by body parts
 * @returns array of the drawings that have been ordered by body parts (head, upper, lower, feet)
 */
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

/**
 * auxillary function to get the player object in the players array only by his name
 * @param {*} name 
 * @returns player with the given name
 */
function getPlayerByName(name) {
    let player;
    for (let i = 0; i<players.length; i++) {
        if (players[i].name === name) {
            player = players[i];
        }
    }
    return player;
}
