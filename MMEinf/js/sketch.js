let brushButton, eraserButton, clearButton, lineButton, sizeSlider, colorPicker, undoButton, on;
on = false;

function setup() {
    var height = document.getElementById("myCanvas").clientHeight;
    var width = document.getElementById("myCanvas").clientWidth;

    alert("height/width " +height +"/" + width);
    var canvas = createCanvas(width, height);
    canvas.parent('myCanvas');
    background(255,255,255);

    brushButton = createButton('brush');

    brushButton.parent('brushBtn');
    //brushButton.position(10, 460);
    brushButton.mousePressed(noErase);
   // brushButton.mousePressed(setBoolFalse);

    eraserButton = createButton('erase');
    eraserButton.parent('eraseBtn');
    //eraserButton.position(60, 460);
    eraserButton.mousePressed(erase);

    clearButton = createButton('clear');
    //clearButton.position(110, 460);
    clearButton.parent('clearBtn');
    clearButton.mousePressed(clearBG);

    undoButton = createButton('undo');
    //undoButton.position(160, 460);
    undoButton.parent('undoBtn');
    undoButton.mousePressed(undoToPreviousState);

    // lineButton = createButton('line');
    // lineButton.position(210, 460);
    // // lineButton.mousePressed(drawLine);
    // // lineButton.mouseReleased(endLine);
    // // lineButton.mousePressed(setBoolTrue);

    sizeSlider = createSlider(1, 50, 10);
    //sizeSlider.position(260, 460);
    sizeSlider.parent('sliderBtn');
    sizeSlider.style('width', '100px');

    colorPicker = createColorPicker('black');
    colorPicker.parent('colorpickerBtn');
    //colorPicker.position(380, 460);

    saveState();
}

function draw() {
    if (!on) {
        if(mouseIsPressed && pmouseY <= 450){
            line(mouseX, mouseY, pmouseX, pmouseY);
        }

        let val = sizeSlider.value();
        strokeWeight(val);
        stroke(colorPicker.color());
    }

    if(on) {
        //TODO: draw line
    }

}

function clearBG() {
    background(255);
}

let valX1, valX2, valY1, valY2;

function drawLine(){
    if (mouseIsPressed){
        valX1 = mouseX;
        valY1 = mouseY;
    }
}

function endLine(){
    valX2 = mouseX;
    valY2 = mouseY;
}

function setBoolTrue(){
    on = true;
}

function setBoolFalse(){
    on = false;
}


function keyPressed(e) {
    // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
    if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
        undoToPreviousState();
    }
}

function undoToPreviousState() {
    // if previousState doesn't exist ie is null
    // return without doing anything
    if (!previousState) {
        return;
    }
    // else draw the background (in this case white)
    // and draw the previous state
    background(255);
    image(previousState, 0, 0);
    // then set previous state to null
    previousState = null;
}

function mousePressed() {
    // the moment input is detect save the state
    saveState();
}

// function mousePressed() {
//     loadPixels();
//
//     let r = pixels[(mouseY * width + mouseX) * 4];
//     let g = pixels[(mouseY * width + mouseX) * 4 + 1];
//     let b = pixels[(mouseY * width + mouseX) * 4 + 2];
//     console.log(r,g,b)
//     bucket(mouseX, mouseY, 0, random(255), random(255), random(255), r, g, b);
//     updatePixels();
// }

function saveState() {
    // save state by taking image of background
    // for more info look at reference for get
    previousState = get();
}

//
// function bucket(x, y, ii, R, G, B, ro, go, bo) {
//     if(ii > 1000)return;
//     let r = pixels[(y * width + x) * 4];
//     let g = pixels[(y * width + x) * 4 + 1];
//     let b = pixels[(y * width + x) * 4 + 2];
//     // console.log(r,g,b,ro,go,bo)
//     if (r == ro && g == go && b == bo) {
//         pixels[(y * width + x) * 4] = R;
//         pixels[(y * width + x) * 4+1] = G;
//         pixels[(y * width + x) * 4+2] = B;
//         for (let i = -1; i <= 1; i++) {
//             if (i == 0) continue;
//             if (x + i >= width) break;
//             if (x + i < 0) break;
//             bucket(x + i, y, ii+1, R, G, B, ro, go, bo);
//         }
//         for (let i = -1; i <= 1; i++) {
//             if (i == 0) continue;
//             if (y + i >= width) break;
//             if (y + i < 0) break;
//             bucket(x, y + i, ii+1, R, G, B, ro, go, bo);
//         }
//     }
// }