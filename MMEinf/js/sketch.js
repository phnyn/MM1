let brushButton, eraserButton, clearButton, lineButton, sizeSlider, colorPicker, undoButton, pickButton, redoButton;
let strokeColor = 'black';


function setup() {
    let height = document.getElementById("myCanvas").clientHeight;
    let width = document.getElementById("myCanvas").clientWidth;

    let canvas = createCanvas(width, height);
    canvas.parent('myCanvas');
    background(255);

    brushButton = createButton('brush');
    brushButton.parent('brushBtn');
    brushButton.mousePressed(noErase);

    eraserButton = createButton('erase');
    eraserButton.parent('eraseBtn');
    eraserButton.mousePressed(erase);

    clearButton = createButton('clear');
    clearButton.parent('clearBtn');
    clearButton.mousePressed(clearBG);

    undoButton = createButton('undo');
    undoButton.parent('undoBtn');
    undoButton.mousePressed(undoToPrevState);

    redoButton = createButton('redo');
    redoButton.parent('redoBtn');
    redoButton.mousePressed(redoPrevState);

    sizeSlider = createSlider(1, 50, 10);
    sizeSlider.parent('sliderBtn');
    sizeSlider.style('width', '100px');

    colorPicker = createColorPicker('black');
    colorPicker.parent('colorpickerBtn');

    saveState();
}

function draw() {
    //TODO remove if-condition for html integration?
    if(mouseIsPressed && pmouseY <= 450){
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    strokeWeight(sizeSlider.value());
    stroke(colorPicker.color());
}

function clearBG() {
    background(255);
}

//TODO UNDO/REDO
const previousStates = [];
let redoState = null;
let redone = false;

function keyPressed(e) {
    //TODO shift+strg+z redo?

    // if (e.keyCode === 90 && (e.ctrlKey || e.metaKey) && (e.shiftKey)) {
    //     redoToPreviousState();
    // }

    if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        undoToPrevState();
    }
}

function saveState() {
    previousStates.push(get());
}

function mousePressed() {
    //TODO remove if-condition for html integration?
    if (pmouseY < 400){
        saveState();
    }
}

function undoToPrevState() {
    if (previousStates[previousStates.length-1] == null) {
        return;
    }
    redone = false;
    redoState = get();
    background(255);
    image(previousStates[previousStates.length-1], 0, 0);
    previousStates.splice(previousStates.length-1, 1);

}

//TODO make multiple states redoable?
function redoPrevState() {
    if (redoState == null) {
        return;
    }
    if (!redone) {
        saveState();
        redone = true;
    }
    background(255);
    image(redoState, 0, 0);
}

//TODO saveCanvas()?


