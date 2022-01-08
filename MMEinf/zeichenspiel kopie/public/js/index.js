var uName;
var host = false;

window.onload = isHost;

/** enter nickname */
function enterNickname(){
    uName = document.getElementById('nickname').value;
    alert(uName);
}

/** if user is host */
function isHost(){
    if(host){
        document.getElementById('indexTxt').innerHTML =" ";
        document.getElementById('indexBtn').innerHTML ="SPIEL HOSTEN";
    }else{
        document.getElementById('indexTxt').innerHTML ="Du wurdest eingeladen!";
        document.getElementById('indexBtn').innerHTML ="SPIEL BEITRETEN";
    }
}