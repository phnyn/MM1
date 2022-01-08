/* list of players */
let players;

/* div container of players */
let playersDIV;

/* max time */
let timer;

let currPlayer;
let isReady;

window.onload = function () {
    players = ["A", "N"];
    currPlayer = players[0];
    isReady = false;
    playersDIV = document.getElementById('players');
    
    showPlayers();
    countdownTimer(30);
};

/* COUNTDOWN TIMER */
//https://www.delftstack.com/de/howto/javascript/count-down-timer-in-javascript/

/**
 * 
 * @param {*} num 
 * @returns 
 */
function paddedFormat(num) {
    return num < 10 ? "0" + num : num; 
}

/**
 * 
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
 * 
 * @param {*} duration 
 * @param {*} element 
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
        };
    }, 1000);
}

/* P L A Y E R */

/**
 * Displays the players in the players container
 */
 function showPlayers(){
    playersDIV.innerHTML = '';

    playersDIV.innerHTML += players[0] + "<br/> ";

    for(let i = 1; i < players.length; i++){
        let player = players[i];
        playersDIV.innerHTML += players[i] + "<br>";
    }
}

// only ONE ready!
function ready(){
    let position = 0;

    player = currPlayer;

    for(let j; j < players.length; j++){
        if(players[j] == player)
            position = j;
    }

    if(isReady == false){
        players[position] += "&#10003";	
        isReady = true;
    }
    showPlayers();
}
