let canvas = document.getElementById("front");
let context = canvas.getContext("2d");

window.addEventListener('resize', resizeCanvas);

let isDrawing = false;
let pointsX = new Array();
let pointsY = new Array();

let draw = function() {
	function startDraw(e) {
		context.strokeStyle = "#348ad2";
		context.lineJoin = "round";
		context.lineCap = "round";
		context.lineWidth = 15;
		isDrawing = true;
		context.beginPath();
		let x = e.pageX - canvas.getBoundingClientRect().left;
		let y = e.pageY - canvas.getBoundingClientRect().top;
		pointsX.push(x);
		pointsY.push(y);
		context.moveTo(x, y);
	}

	function continueDraw(e) {
		if (isDrawing) {
			let x = e.pageX - canvas.getBoundingClientRect().left;
			let y = e.pageY - canvas.getBoundingClientRect().top;
			pointsX.push(x);
			pointsY.push(y);
			context.lineTo(x, y);
			context.stroke();	
		}
	}

	function stopDraw() {
		isDrawing = false;
	}

	canvas.addEventListener("mousedown", startDraw);
	canvas.addEventListener("mousemove", continueDraw);
	canvas.addEventListener("mouseup", stopDraw);
	canvas.addEventListener("mouseout", stopDraw);
}

function fadeInk() {
	context.fillStyle = "rgba(249,250,237,0.3)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	setTimeout(fadeInk, 300);
}

function resizeCanvas() {
	canvas.width = window.innerWidth * .8;
	canvas.height = window.innerHeight * .8;
}


resizeCanvas()
draw();
fadeInk();

