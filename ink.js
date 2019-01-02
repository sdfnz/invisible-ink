var canvas = document.getElementById("front");
var ctx = canvas.getContext("2d");

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousedown', startDraw);
window.addEventListener('mousemove', continueDraw);
window.addEventListener('mouseup', endDraw);
var paint = false;

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

resizeCanvas()

function startDraw() {
	paint = true;
}

function continueDraw() {

}

function endDraw() {
	paint = false;
}

