let brushButton, eraserButton, clearButton, lineButton, sizeSlider, colorPicker, undoButton, pickButton, redoButton;
let strokeColor = 'black';

// let markButton;

function setup() {
    let height = document.getElementById("myCanvas").clientHeight;
    let width = document.getElementById("myCanvas").clientWidth;

    let canvas = createCanvas(width, height);
    canvas.parent('myCanvas');
    background(255);

    brushButton = createImg('./img/icons/paint-brush.png');
    brushButton.size(30,30);
    brushButton.parent('brushBtn');
    brushButton.mousePressed(noErase);

    eraserButton = createImg('./img/icons/eraser.png');
    eraserButton.size(30,30);
    eraserButton.parent('eraseBtn');
    eraserButton.mousePressed(erase);

    clearButton = createImg('./img/icons/bin.png');
    clearButton.size(30,30);
    clearButton.parent('clearBtn');
    clearButton.mousePressed(clearBG);

    undoButton = createImg('./img/icons/undo.png');
    undoButton.size(30,30);
    undoButton.parent('undoBtn');
    undoButton.mousePressed(undoToPrevState);

    redoButton = createImg('./img/icons/redo.png');
    redoButton.size(30,30);
    redoButton.parent('redoBtn');
    redoButton.mousePressed(redoPrevState);

    sizeSlider = createSlider(1, 35, 7);
    sizeSlider.parent('sliderBtn');
    sizeSlider.style('width', '100px');

    colorPicker = createColorPicker('black');
    colorPicker.size(30, 30)
    colorPicker.parent('colorpickerBtn');

    // markButton = createButton('TEST');
    // markButton.size(30,30);
    // markButton.parent('markBtn');
    // markButton.mousePressed(setImageVisible('mark', 'hidden'));

    saveState();
}

function draw() {
    //TODO change to curve()?
    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
        cursor(CROSS);
    } else {
        cursor(ARROW);
    }

    strokeWeight(sizeSlider.value());
    stroke(colorPicker.color());
}

function cursorHand() {
    cursor(HAND);
}

function clearBG() {
    background(255);
}

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
    if (!isBlank()){
        previousStates.push(get());
    }
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

function isBlank() {
    return canvas.toDataURL() === document.getElementById('blank').toDataURL();
}
