var socket;
let drawings = [];

function preload() {
  socket = io.connect('http://localhost:3000');
  socket.emit('drawings');
  socket.on('combineImg', (data) => {
    for(let i = 0; i < 4; i++){
      drawings[i] = loadImage(data[i]);
    }
  });
}

function setup() {
  let width = 350
  let height = 400
  let cvs = createCanvas(width, height);
  cvs.parent('final');
}

function draw() {
  for(let i = 0; i < 4; i++){
    setTimeout(display, 100);
    function display() {
      image(drawings[i], 0, 0+i*height/4, width, height/4);
    }
  }
}