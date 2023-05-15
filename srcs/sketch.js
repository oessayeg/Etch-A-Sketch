function makeGrid()
{
	const mainEtchDiv = document.querySelector("#etch");
	let gridSize = document.querySelector("#sizeRange").value;

	for (let i = 0; i < gridSize; i++)
	{
		const row = document.createElement("div");

		row.classList.add("row");
		for (let j = 0; j < gridSize; j++)
		{
			const square = document.createElement("div");

			square.classList.add("square");
			row.appendChild(square);
			if (!isGridButtonActivated)
			{
				square.style.width = `${420 / gridSize}px`;
				square.style.height = `${420 / gridSize}px`;
				square.style.border = "";
			}
			else
			{
				square.style.width = `${420 / gridSize - 1}px`;
				square.style.height = `${420 / gridSize - 1}px`;
				square.style.border = "0.5px solid grey";
			}
		}
		mainEtchDiv.appendChild(row);
	}
}

function draw()
{
	let sq;
	let clicked;
	let colorPicker;
	
	colorPicker = document.querySelector("#picker");
	sq = document.querySelectorAll(".square");
	clicked = false
	
	sq.forEach(sq => 
	{
		sq.addEventListener("mousedown", (event) =>
		{
			clicked = true;
			if (mode == "eraseMode")
				sq.style.backgroundColor = "white";
			else if (mode == "rainbowMode")
				sq.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
			else
				sq.style.backgroundColor = colorPicker.value;
		});
	})
	
	sq.forEach(sq => 
	{
		sq.addEventListener("mouseover", (event) =>
		{
			if (clicked)
			{
				if (mode == "eraseMode")
					sq.style.backgroundColor = "white";
				else if (mode == "rainbowMode")
					sq.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
				else
					sq.style.backgroundColor = colorPicker.value;
			}
		});
	});
	
	sq.forEach(sq =>
	{
		sq.addEventListener("mouseup", (event) =>
		{
			clicked = false;
		});
	})
}

function resetGrid()
{
	const rows = document.querySelectorAll(".row");
	const gridSize = document.querySelector("#sizeRange");

	rows.forEach(row => row.remove());
	makeGrid();
	draw();
}

function clearButtonHandler()
{
	const clearButton = document.querySelector("#cleaner");
	
	clearButton.addEventListener("click", resetGrid);
}

function gridSizeHandler()
{
	const rangeButton = document.querySelector("#sizeRange");
	const rangeInfo = document.querySelector("h4");

	rangeButton.addEventListener("input", (event) =>
	{
		rangeInfo.textContent = rangeButton.value + " x " + rangeButton.value;
		resetGrid()
	});
}

function gridLinesHandler()
{
	const gridShowButton = document.querySelector("#gridButton");

	gridShowButton.addEventListener("click", (event) =>
	{
		const squares = document.querySelectorAll(".square");
		const oldSize = parseFloat(squares[0].style.width.replaceAll(/[a-z]/g, ""));

		squares.forEach(square =>
		{
			if (!isGridButtonActivated)
			{
				square.style.width = oldSize - 1 + "px";
				square.style.height = oldSize - 1 + "px";
				square.style.border = "0.5px solid grey";
			}
			else if (isGridButtonActivated)
			{
				square.style.width = oldSize + 1 + "px";
				square.style.height = oldSize + 1 + "px";
				square.style.border = "";
			}
		});
		isGridButtonActivated = !isGridButtonActivated;
		colorButton(isGridButtonActivated, gridShowButton);
	});
}

function colorModesHandler()
{
	const eraseButton = document.querySelector("#eraser");
	const rainbowButton = document.querySelector("#rainbowButton");
	const colorModeButton = document.querySelector("#colorButton");

	eraseButton.addEventListener("click", (event) =>
	{
		mode = "eraseMode";
		colorButton(true, eraseButton);
		colorButton(false, rainbowButton);
		colorButton(false, colorModeButton);
	});

	rainbowButton.addEventListener("click", (event) =>
	{
		mode = "rainbowMode";
		colorButton(true, rainbowButton);
		colorButton(false, eraseButton);
		colorButton(false, colorModeButton);
	});

	colorModeButton.addEventListener("click", (event) =>
	{
		mode = "colorMode";
		colorButton(true, colorModeButton);
		colorButton(false, rainbowButton);
		colorButton(false, eraseButton);
	});
}

function colorButton(isActivated, query)
{
	if (isActivated)
	{
		query.style.backgroundColor = "#360f00";
		query.style.color = "#F6F1E9";
	}
	else
	{
		query.style.backgroundColor = "";
		query.style.color = "#360f00";
	}
}

function etchASketch()
{
	makeGrid();
	draw();
	clearButtonHandler();
	gridSizeHandler();
	gridLinesHandler();
	colorModesHandler();
	colorButton(true, document.querySelector("#colorButton"));
}

let isGridButtonActivated = false;
let mode = "colorMode";

etchASketch();