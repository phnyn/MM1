let time, bodypart;

let players = ["Arnold", "Bernd", "Claudia"];

function copyLink(){
    var copyText = document.getElementById('inviteLink');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("Copied Link " + copyText.value);
}

function startGame(){
    var select = document.getElementById('settingBodypart');
    bodypart = select.options[select.selectedIndex].value;

    select = document.getElementById('settingTime');
    time = select.options[select.selectedIndex].value;

    alert(bodypart + " " + time);
}