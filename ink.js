let canvas = document.getElementById("front");
let context = canvas.getContext("2d");

window.addEventListener('resize', resizeCanvas);

let isDrawing = false;
let revealed = false;
let timedFade;
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
		pointsX.push(-1);
		pointsY.push(-1);
	}

	canvas.addEventListener("mousedown", startDraw);
	canvas.addEventListener("mousemove", continueDraw);
	canvas.addEventListener("mouseup", stopDraw);
	canvas.addEventListener("mouseout", stopDraw);
}

function fadeInk() {
	context.fillStyle = "rgba(249,250,237,0.3)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	timedFade = setTimeout(fadeInk, 300);
}

function clearCanvas() {
	if (revealed) {
		context.fillStyle = "#454545";
		context.fillRect(0, 0, canvas.width, canvas.height);
		pointsX = [];
		pointsY = [];
	} else {
		context.fillStyle = "#f9faed";
		context.fillRect(0, 0, canvas.width, canvas.height);
		pointsX = [];
		pointsY = [];
	}
}

function revealInk() {
	revealed = !revealed;
	if (revealed) {
		clearTimeout(timedFade);
		context.fillStyle = "#454545";
		context.fillRect(0, 0, canvas.width, canvas.height);
		if (pointsX.length > 0) {
			context.beginPath();
			context.moveTo(pointsX[0], pointsY[0]);
			for (let i = 0; i < pointsX.length; i++) {
				if (pointsX[i] === -1) {
					while (pointsX[i] === -1) {
						i++;
					}
					context.beginPath();
					context.moveTo(pointsX[i], pointsY[i]);
				} else {
					context.lineTo(pointsX[i], pointsY[i]);
					context.stroke();	
				}
			}
		}
	} else {
		context.fillStyle = "#f9faed";
		context.fillRect(0, 0, canvas.width, canvas.height);
		fadeInk();
	}
}

function resizeCanvas() {
	canvas.width = window.innerWidth * .8;
	canvas.height = window.innerHeight * .8;
}

const clearBtn = document.querySelector(".clear");
const revealBtn = document.querySelector(".reveal");
clearBtn.addEventListener("click", clearCanvas);
revealBtn.addEventListener("click", revealInk);


resizeCanvas()
draw();
fadeInk();

