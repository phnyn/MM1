//import {body} from "./body.js";

/* list of players */
let players;

/* max time */
let timer;

/* the current player / window owner */
let currentPlayer;

/* the body parts */
const body = {
    head: "head",
    lower: "lower body",
    upper: "upper body",
    feet: "feet"
};

window.onload = function () {
    /* TODO: entfernen! nur für Testzwecke*/
    const a = new Player("Arnold", false, false, body.head,false);
    const b = new Player("Bernd", false, true, body.lower, false);
    const c = new Player("Claudia", true, false, body.lower, false);
    const d = new Player("Diona", false, false, body.feet, true);

    // players = ["A", "B", "C","D"];
    players = [a,b,c,d];

    //currentPlayer = "A";
    currentPlayer = getCurrentPlayer();

    showPlayers();
    countdownTimer(30);
    showBodypart();
};

/* COUNTDOWN TIMER */
//https://www.delftstack.com/de/howto/javascript/count-down-timer-in-javascript/

/**
 * formats the seconds
 * @param {int} num - the seconds
 * @returns format of time in [min:secs]
 */
function paddedFormat(num) {
    return num < 10 ? "0" + num : num; 
}

/**
 * Starts the countdown
 * @param {int} time in seconds
 */
function countdownTimer(time){	
    let time_minutes = parseInt(time/60); // Value in minutes
    let time_seconds = parseInt(time % 60); // Value in seconds

    let duration = time;

    let element = document.getElementById('timer');
    element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;
    
    startCountDown(--duration, element);
}

/**
 * Counts down the time and displays it on the html site every seconds.
 * @param {int} duration - countdown start
 * @param {div} element - the div element
 */
function startCountDown(duration, element) {
    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(function () {

        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);

        element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

        secondsRemaining = secondsRemaining - 1;
        if (secondsRemaining < 0) {
             clearInterval(countInterval) 
        }
    }, 1000);
}

/* P L A Y E R */

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
 * Displays all the players in the sidebar
 */ 
 function showPlayers(){
    let painting, greyout, player, element;

    for(let i=0; i < players.length; i++){
        let role = " ";

        for(let j=0; j < players.length; j++){
            if(getIndex(players[j]) === i){
                player = players[j];
            }
        }

        // classes 
        if(player.ready === true){
            // painting = ' &#20; R E A D Y ! &#10004; ';
            painting = 'R E A D Y !';
            greyout = 'ready';
        } else if(player === getCurrentPlayer()){
            painting = ' ';
            greyout = null;
        } else{
            painting = 'drawing <span>.</span><span>.</span><span>.</span>';
            greyout = 'greyout';
        }

        // roles
        if(player === getCurrentPlayer()){
            role = "(you)";
        }
        if(player.isHost === true){
            role = "(host)";
        }

        element = document.getElementById('body-'+i);
        element.getElementsByTagName('img')[0].classList.add(greyout);
        element.getElementsByTagName('span')[0].innerHTML = player.name + role;
        element.getElementsByClassName('painting')[0].innerHTML = painting;
    }
}

function showBodypart(){
    document.getElementById('myBodypart').innerText = getCurrentPlayer().bodypart;
}

/**
 * changes the status of the player to ready
 * TODO: currently for the current player!
 */
function ready(){
    let player = getCurrentPlayer();
    let position = getIndex(player);

    if(player.ready === false){
        let element = document.getElementById('body-'+position);
        element.getElementsByTagName('img')[0].classList.add('ready');
        element.getElementsByClassName('painting')[0].innerHTML = " R E A D Y !";
        player.ready = true;
    }
}

/**
 * 
 * @returns the current user
 */
function getCurrentPlayer(){
    let current; 
    for(let i=0; i < players.length; i++){
        if(players[i].currentPlayer === true){
           current = players[i];
        }
    }
    return current;
}

/**
 * Get the index of the player
 * @param {Player} player 
 * @returns the index of the player according to their bodyparts
 */
function getIndex(player){
    let index;

    switch(player.bodypart){
        case body.head: index = 0; break;
        case body.upper: index = 1; break;
        case body.lower: index = 2;break;
        case body.feet: index = 3; break;
    }
    return index;
}

/* P L A Y E R */

/**
 * Displays all the players in the sidebar
 *
function showPlayers(){
    let painting, greyout;

    for(let i=0; i < players.length; i++){

        if(players[i] == currPlayer){
            painting = ' ';
            greyout =' ';
        } else {
            painting = 'zeichnet <span>.</span><span>.</span><span>.</span>'
            greyout = 'greyout';
        }

        document.getElementById('body-'+i).innerHTML += 
        '<img class="'+greyout+'" src="img/bodypart/'+i+'.png"></img>'+
        '<span class="caption">'+players[i]+'</span><div class="painting">' + painting + '</div>';
        }
}

// only ONE ready!
function ready(){
    let player = currentPlayer;
    let position = getIndex(player);

    if(isReady == false){
        let element = document.getElementById('body-'+position);
        element.getElementsByTagName('img')[0].classList.add('ready');
        element.getElementsByClassName('painting')[0].innerHTML = "&#20; F E R T I G ! &#10004; ";
        isReady = true;
    }
}

function getIndex(player){
    let position = 0;

    for(let j=0; j < players.length; j++){
        if(players[j] == player)
            position =j;
    }
    return position;
}*/

