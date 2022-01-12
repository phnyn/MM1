import Player from "./player.js";
let uName;

let player;

window.onload = function(){
    player = new Player("",true,true,"",false);
    isHost();
}

/**
 * enter nickname
 */
function enterNickname(){
    uName = document.getElementById('nickname').value;
    player.name = uName;
    alert(uName);
}

/**
 * checks if user is host or an invited player and displays text
 */
function isHost(){
    if(player.isHost == true){
        document.getElementById('indexTxt').innerHTML =" ";
        document.getElementById('indexBtn').innerHTML ="SPIEL HOSTEN";
    }else{
        document.getElementById('indexTxt').innerHTML ="Du wurdest eingeladen!";
        document.getElementById('indexBtn').innerHTML ="SPIEL BEITRETEN";
    }
}

function Player(name, currentPlayer, isHost, bodypart, ready){
    this.name = name;
    this.currentPlayer = currentPlayer;
    this.isHost = isHost;
    this.bodypart = bodypart;
    this.ready = ready;
}
