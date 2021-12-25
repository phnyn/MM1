/* list of players */
let players;

/* div container of players */
let playersDIV;

/* max time */
let timer;

window.onload = function () {
    players = ["A", "N"];
    playersDIV = document.getElementById('players');
    showPlayers();
    countdownTimer(5);
};

function paddedFormat(num) {
    return num < 10 ? "0" + num : num; 
}

function countdownTimer(time){
    let time_minutes = 1; // Value in minutes
    let time_seconds = 30; // Value in seconds

    let duration = time_minutes * 60 + time_seconds;

    let element = document.getElementById('timer');
    element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;

    startCountDown(--duration, element);
}

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
//https://www.delftstack.com/de/howto/javascript/count-down-timer-in-javascript/

/* P L A Y E R */

/**
 * Displays the players in the players container
 */
 function showPlayers(){
    playersDIV.innerHTML = '';

    playersDIV.innerHTML += players[0] + " (Host) <br/> ";

    for(let i = 1; i < players.length; i++){
        let player = players[i];
        playersDIV.innerHTML += players[i] + "<br>";
    }
}

function ready(player){
    let position = 0;

    for(let j; j < players.length; j++){
        if(players[j] == player)
            position = j;
    }
    //delete 1 element at [position] in players
    players.splice(position,1);

    showPlayers();
}
