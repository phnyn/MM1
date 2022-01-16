//selected time and bodypart
let time, bodypart;

/* list of players */
let players;

/* the current player/owner of window */
let currentPlayer;

// TODO: DELETE
let testPlayer, testPlayer2;

/* div container of players */
let playersDIV;

/* calls the function init upon window loading */
window.onload = function (){
    playersDIV = document.getElementById('players');
    //players  = ["Arnold", "Bernd", "Claudia", "Diona"];

    const a = new Player("Alexander", false, true,"",false);
    const b = new Player("Paul", true ,false,"", false);
    const c = new Player("Phuong", false , false,"", false);
    const d = new Player("Sebastian", false, false,"", false);

    currentPlayer = b;

    //TODO DELETE
    testPlayer = new Player("Frieda", false,false,"",false);
    testPlayer2 = new Player("Alberto", false,false,"",false);

    players = [a,b,c,d];
    inviteLink("drawtogether.com/invite/1234");
    showPlayers();
    displayStart();
}

/* P L A Y E R */

/**
 * Displays the players in the players container AS HOST
 * Only Host can see the kick buttons
 */
function showPlayers(){
    let element;
    //playersDIV.innerHTML = '';
    for(let i = 0; i<4;i++){
        //let content = players[i].name + role + kickBtn;
        let waiting = "waiting <span>.</span><span>.</span><span>.</span>";
        element = document.getElementById('p'+i);
        element.classList.add("greyout");
        element.getElementsByClassName('playerContent')[0].innerHTML = '';
        element.getElementsByClassName('waiting')[0].innerHTML = waiting;
    }
    
    for(let i=0; i < players.length; i++){
        let kickBtn = "<br/><span class=\" kickBtn \" onclick=\"kickPlayer('"+players[i].name+"')\">X</span>";
        let role = "";
        element = document.getElementById('p'+i);

        if(players[i].currentPlayer){
            kickBtn =" ";
            role ="(you)";
        }

        if(players[i].isHost){
            role = "(host)";
            kickBtn =" ";
        }

        if(!currentPlayer.isHost){
            kickBtn =" ";
        }

        let content = players[i].name  + role + kickBtn;
        element.getElementsByClassName('playerContent')[0].innerHTML = content;
        element.getElementsByClassName('waiting')[0].innerHTML = '';
        element.classList.remove('greyout');
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
	let id= "p"+position;
	let div = document.getElementById(id);
	
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
    navigator.clipboard.writeText(copyText.value);
    // alert("Copied: " + copyText.value);
}

/**
 * Starts the game with the selected settings
 * TODO: time & bodypart where?
 */
function startGame(){
    let select = document.getElementById('settingTime');
    time = select.options[select.selectedIndex].value;
    
    alert(time);
}

function displayStart(isHost){
    let select = document.getElementById('settingTime');
    time = select.options[select.selectedIndex].value;

    if(!currentPlayer.isHost){
        document.getElementById('minute').innerHTML = time + " minute";
        document.getElementById('settingTime').style="display:none";
        document.getElementById('startBtn').style="display:none";
    }
}

function Player(name, currentPlayer, isHost, bodypart, ready){
    this.name = name;
    this.currentPlayer = currentPlayer;
    this.isHost = isHost;
    this.bodypart = bodypart;
    this.ready = ready;
}
