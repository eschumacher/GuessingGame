var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var easyMode = false;

var numSquares = 6;
var colors;
var pickedColor;

init();
newGame();


function changeAllColors(color)
{
	for (var i=0; i<squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for (var i=0; i<num; i++)
	{
		arr.push(randomColor());
	}

	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function init()
{
	resetButton.addEventListener("click", function(){
		newGame();
	});

	easyButton.addEventListener("click", function(){
		if (!easyMode)
		{
			easyMode = true;
			this.classList.add("selected");
			hardButton.classList.remove("selected");
			numSquares = 3;
			newGame();
		}
	});

	hardButton.addEventListener("click", function(){
		if (easyMode)
		{
			easyMode = false;
			this.classList.add("selected");
			easyButton.classList.remove("selected");
			numSquares = 6;
			newGame();
		}
	});

	for (var i=0; i<squares.length; i++)
	{
		squares[i].addEventListener("click", function(){
			if (this.style.backgroundColor === pickedColor)
			{
				messageDisplay.textContent = "Correct!";
				changeAllColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			}
			else
			{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function newGame()
{
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";

	for (var i=0; i<squares.length; i++)
	{
		if (i < colors.length)
		{
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
		else
		{
			squares[i].style.display = "none";
		}
	}
}