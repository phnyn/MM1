var socket = io.connect('http://localhost:3000');
let player, uName;

window.onload = function() {
    player = new Player("",true,true,"",false);
    socket.emit("host");
    socket.on("host", () => {
        player.isHost = true;
        isHost();
    });
    socket.on("notHost", () => {
        player.isHost = false;
        isHost();
    })
}

/**
 * enter nickname
 */
function enterNickname(){
    uName = document.getElementById('nickname').value;
    player.name = uName;
}

function redirectLobby() {
    socket.emit("playerdata", (player));
    window.location.href = 'setting.html';
}

function enterPressed() {
    if(event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("indexBtn").click();
    }
}

/**
 * checks if user is host or an invited player and displays text
 */
function isHost(){
    if(player.isHost == true){
        document.getElementById('indexTxt').innerHTML =" ";
        document.getElementById('indexBtn').innerHTML ="Host Game";
    } else {
        document.getElementById('indexTxt').innerHTML ="You got invited to play!";
        document.getElementById('indexBtn').innerHTML ="Join Game";
    }
}

function Player(name, currentPlayer, isHost, bodypart, ready){
    this.name = name;
    this.currentPlayer = currentPlayer;
    this.isHost = isHost;
    this.bodypart = bodypart;
    this.ready = ready;
}
