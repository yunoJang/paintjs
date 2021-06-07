const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelector('#jsColors');
const range = document.querySelector('#jsRange')
const mode = document.querySelector('#jsMode');
const saveButton = document.querySelector('#jsSave');

const INITIAL_STYLE = '#2C2C2C';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_STYLE;
ctx.fillStyle = INITIAL_STYLE;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    ctx.closePath();
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMousemove(e) {   
    const x = e.offsetX;
    const y = e.offsetY;
    
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y); 
        ctx.stroke();
    }
}

function changeColor(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleColorsClick(e) { 
    if(e.target.tagName !== 'LI') return;

    const color = e.target.style.backgroundColor;
    changeColor(color);
}

function onRangeChange(e) {
    const strokeSize = e.target.value;
    ctx.lineWidth = strokeSize;
}

function fillCanvas() {
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function handleClickCanvas(e) {
    if(filling) {
        fillCanvas();
    }
}

function handleCM(e) {
    console.log(e)
    e.preventDefault();
}

function onClickMode() {
    if(filling) {
        filling = false;
        mode.textContent = 'Fill';
    } else {
        filling = true;
        mode.textContent = 'Paint';
    }
}

function onClickSave(e) {
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'paintJS[🎨]'
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove',onMousemove);
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave',stopPainting)
    canvas.addEventListener('click', handleClickCanvas)
    canvas.addEventListener('contextmenu', handleCM)
}

colors.addEventListener('click', handleColorsClick);

if (range) {
    range.addEventListener('change', onRangeChange)
}

if(mode) {
    mode.addEventListener('click', onClickMode)
}

if(saveButton) {
    saveButton.addEventListener('click',onClickSave)
}