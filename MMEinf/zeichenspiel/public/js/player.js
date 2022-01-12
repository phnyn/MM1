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
