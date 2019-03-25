const canvas = document.getElementById("front");
const context = canvas.getContext("2d");
const clearBtn = document.querySelector(".clear");
const revealBtn = document.querySelector(".reveal");
const colorPick = document.querySelector(".picker"); 

let brushColor = colorPick.value;
let isDrawing = false;
let revealed = false;
let timedFade;
let coords = new Array();

let draw = function() {
	function startDraw(e) {
		let pX;
		let pY;
		if (e.targetTouches) {
			e.preventDefault();
			pX = e.targetTouches[0].pageX;
			pY = e.targetTouches[0].pageY;
		} else {
			pX = e.pageX;
			pY = e.pageY;
		}
		context.strokeStyle = brushColor;
		context.lineJoin = "round";
		context.lineCap = "round";
		context.lineWidth = 15;
		isDrawing = true;
		context.beginPath();
		let x = pX - canvas.getBoundingClientRect().left;
		let y = pY - canvas.getBoundingClientRect().top;
		coords.push([x, y, brushColor]);
		context.moveTo(x, y);
	}

	function continueDraw(e) {
		if (isDrawing) {
			let pX;
			let pY;
			if (e.targetTouches) {
				e.preventDefault();
				pX = e.targetTouches[0].pageX;
				pY = e.targetTouches[0].pageY;
			} else {
				pX = e.pageX;
				pY = e.pageY;
			}
			let x = pX - canvas.getBoundingClientRect().left;
			let y = pY - canvas.getBoundingClientRect().top;
			coords.push([x, y, brushColor]);
			context.lineTo(x, y);
			context.stroke();	
		}
	}

	function stopDraw() {
		isDrawing = false;
		coords.push([-1, -1, -1]);
	}

	canvas.addEventListener("mousedown", startDraw);
	canvas.addEventListener("touchstart", startDraw);
	canvas.addEventListener("mousemove", continueDraw);
	canvas.addEventListener("touchmove", continueDraw);
	canvas.addEventListener("mouseup", stopDraw);
	canvas.addEventListener("touchend", stopDraw);
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
		coords = [];
	} else {
		context.fillStyle = "#f9faed";
		context.fillRect(0, 0, canvas.width, canvas.height);
		coords = [];
	}
}

function revealInk() {
	revealed = !revealed;
	if (revealed) {
		clearTimeout(timedFade);
		context.fillStyle = "#454545";
		context.fillRect(0, 0, canvas.width, canvas.height);
		if (coords.length > 0) {
			context.beginPath();
			context.moveTo(coords[0][0], coords[0][1]);
			context.strokeStyle = coords[0][2];
			for (let i = 0; i < coords.length; i++) {
				if (coords[i][0] === -1) {
					while (coords[i][0] === -1) {
						i++;
					}
					context.beginPath();
					context.strokeStyle = coords[i][2];
					context.moveTo(coords[i][0], coords[i][1]);
				} else {
					context.strokeStyle = coords[i][2];
					context.lineTo(coords[i][0], coords[i][1]);
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

function changeColor() {
	brushColor = colorPick.value;
	context.strokeStyle = brushColor;
}

window.addEventListener("resize", resizeCanvas);

colorPick.addEventListener("change", changeColor);

clearBtn.addEventListener("click", clearCanvas);

revealBtn.addEventListener("click", revealInk);


resizeCanvas()
draw();
fadeInk();
