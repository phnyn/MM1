//selected time and bodypart
let time, bodypart;

/* list of players */
let players;

/* the current player/owner of window */
let currentPlayer;

// TODO: DELETE
let testPlayer;

/* div container of players */
let playersDIV;

/* calls the function init upon window loading */
window.onload = function (){
    playersDIV = document.getElementById('players');
    //players  = ["Arnold", "Bernd", "Claudia", "Diona"];

    const a = new Player("Arnold", true, true,"",false);
    const b = new Player("Bernd", false, false,"", false);
    const c = new Player("Claudia", false , false,"", false);
    const d = new Player("Diona", false, false,"", false);

    currentPlayer = a;

    //TODO DELETE
    testPlayer = new Player("Frederick", false,false,"",false);

    players = [a,b,c,d];

    inviteLink("drawtogether.com/invite/1234");
    showPlayers();
}

/* P L A Y E R */

/**
 * Displays the players in the players container AS HOST
 * Only Host can see the kick buttons
 */
function showPlayers(){
    playersDIV.innerHTML = '';

    for(let i = 0; i < players.length; i++){
        let kickBtn = " <span class=\" kickBtn \" onclick=\"kickPlayer('"+players[i].name+"')\">X</span>";
        let role = "";
        
        if(players[i].isHost){
            role = "(host)";
            kickBtn =" ";
        }

        if(players[i].currentPlayer){
            kickBtn =" ";
            role ="(you)";
        }

        if(currentPlayer.isHost != true){ //only host can see kick buttons
            kickBtn = " ";
        }

        playersDIV.innerHTML += "<div id=\"p"+i+"\" class=\"circle\">"+ players[i].name + role + kickBtn+"</div>";
    }
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
 */
 function kickPlayer(player){
    let position;
	
    for(let j=0; j < players.length; j++){
        if(players[j].name == player){
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
 * @param {string} link 
 */
function inviteLink(link){
    let inviteDiv = document.getElementById('inviteLink');
    inviteDiv.value = link;
}

/**
 * Allows the user to copy the invitelink to their clipboard
 */
function copyLink(){
    let copyText = document.getElementById('inviteLink');
    copyText.select();
    window.navigator.clipboard.writeText(copyText.value);
    alert("Copied: " + copyText.value);
}

/**
 * Starts the game with the selected settings
 * TODO: time & bodypart where?
 */
function startGame(){
    let select = document.getElementById('settingBodypart');
    bodypart = select.options[select.selectedIndex].value;

    select = document.getElementById('settingTime');
    time = select.options[select.selectedIndex].value;
    
    alert(bodypart + " " + time);
}


function Player(name, currentPlayer, isHost, bodypart, ready){
    this.name = name;
    this.currentPlayer = currentPlayer;
    this.isHost = isHost;
    this.bodypart = bodypart;
    this.ready = ready;
}
