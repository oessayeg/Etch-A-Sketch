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
			if (!isActivated)
			{
				square.style.width = `${420 / gridSize}px`;
				square.style.height = `${420 / gridSize}px`;
				square.style.border = "";
			}
			else
			{
				square.style.width = `${420 / gridSize - 1}px`;
				square.style.height = `${420 / gridSize - 1}px`;
				square.style.border = "0.5px solid black";
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
			sq.style.backgroundColor = colorPicker.value;
		});
	})
	
	sq.forEach(sq => 
	{
		sq.addEventListener("mouseover", (event) =>
		{
			if (clicked)
				sq.style.backgroundColor = colorPicker.value;
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
			if (!isActivated)
			{
				square.style.width = oldSize - 1 + "px";
				square.style.height = oldSize - 1 + "px";
				square.style.border = "0.5px solid black";
			}
			else if (isActivated)
			{
				square.style.width = oldSize + 1 + "px";
				square.style.height = oldSize + 1 + "px";
				square.style.border = "";
			}
		});
			isActivated = !isActivated;
	});
}

let isActivated = false;

makeGrid();
draw();
clearButtonHandler();
gridSizeHandler();
gridLinesHandler();