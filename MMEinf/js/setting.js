let time, bodypart;

/* list of players */
let players;

/* div container of players */
let playersDIV;

/* calls the function init upon window loading */
window.onload = function (){
    playersDIV = document.getElementById('players');
    players  = ["Arnold", "Bernd", "Claudia", "Diona"];
    inviteLink("drawtogether.com/invite/1234");
    showPlayers();
}

/* P L A Y E R */

/**
 * Displays the players in the players container
 */
function showPlayers(){
    playersDIV.innerHTML = '';

    playersDIV.innerHTML += players[0] + " (Host) <br/> ";

    for(let i = 1; i < players.length; i++){
        let player = players[i];
        playersDIV.innerHTML += "<span id=\"p"+i+"\">" + player + 
        "<button class=\" kickBtn \" onclick=\"kickPlayer('"+player+"')\">x</button></span></br>";
    }

    console.log(players);
}

/**
 * Adds [player] to the list of players
 * @param {String} player - new player
 */
function addPlayer(player){
    players.push(player);
    showPlayers();
}

/**
 * Removes [player] from the list of players
 * @param {String} player - player to be kicked
 *
function kickPlayer(position,player){
    var id = "p"+position;
    document.getElementById(id).innerHTML="";
    showPlayers();
}*/

/**
 * Removes [player] from the list of players
 * @param {String} player - player to be kicked
 */
 function kickPlayer(player){
    let position;

    for(let j=0; j < players.length; j++){
        if(players[j] == player){
            position = j;
        }
    }
    //delete 1 element at [position] in players
    players.splice(position,1);

    showPlayers();
}

/* I N V I T E  L I N K */

/**
 * Changes value of the element #inviteLink to [link]
 * @param {String} link 
 */
function inviteLink(link){
    let inviteDiv = document.getElementById('inviteLink');
    inviteDiv.value = link;
}

/**
 * Allows the user to copy the invitelink to their clipboard
 */
function copyLink(){
    var copyText = document.getElementById('inviteLink');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("Copied Link " + copyText.value);
}

/**
 * Starts the game with the selected settings
 */
function startGame(){
    let select = document.getElementById('settingBodypart');
    bodypart = select.options[select.selectedIndex].value;

    select = document.getElementById('settingTime');
    time = select.options[select.selectedIndex].value;
    
    alert(bodypart + " " + time);
}

