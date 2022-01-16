let brushButton, eraserButton, clearButton, lineButton, sizeSlider, colorPicker, undoButton, pickButton, redoButton;
let strokeColor = 'black';

function setup() {
    let height = document.getElementById("myCanvas").clientHeight;
    let width = document.getElementById("myCanvas").clientWidth;

    let canvas = createCanvas(width, height);
    canvas.parent('myCanvas');
    background(255);

    brushButton = createImg('./img/icons/paint-brush.png');
    brushButton.size(AUTO,30);
    brushButton.parent('brushBtn');
    brushButton.mousePressed(noErase);

    eraserButton = createImg('./img/icons/eraser.png');
    eraserButton.size(AUTO,30);
    eraserButton.parent('eraseBtn');
    eraserButton.mousePressed(erase);


    clearButton = createImg('./img/icons/bin.png');
    clearButton.size(AUTO,30);
    clearButton.parent('clearBtn');
    clearButton.mousePressed(clearBG);

    undoButton = createImg('./img/icons/undo.png');
    undoButton.size(AUTO,30);
    undoButton.parent('undoBtn');
    undoButton.mousePressed(undoToPrevState);

    redoButton = createImg('./img/icons/redo.png');
    redoButton.size(AUTO,30);
    redoButton.parent('redoBtn');
    redoButton.mousePressed(redoPrevState);

    sizeSlider = createSlider(1, 35, 7);
    sizeSlider.parent('sliderBtn');
    sizeSlider.style('width', '100px');

    colorPicker = createColorPicker('black');
    colorPicker.size(AUTO, 30)
    colorPicker.parent('colorpickerBtn');

    saveState();
}

function draw() {
    if(mouseIsPressed){
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
    if (pmouseY < canvas.height && pmouseY > 0 && pmouseX < canvas.width && pmouseX > 0){
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

function canvasToURL(){
    return canvas.toDataURL();
}

