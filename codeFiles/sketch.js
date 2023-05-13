function makeGrid(gridSize)
{
	const mainEtchDiv = document.querySelector("#etch");

	for (let i = 0; i < gridSize; i++)
	{
		const row = document.createElement("div");

		row.classList.add("row");
		for (let j = 0; j < gridSize; j++)
		{
			const square = document.createElement("div");

			square.classList.add("square");
			row.appendChild(square);
			square.style.width = `${420 / gridSize}`;
			square.style.height = `${420 / gridSize}`;
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
	makeGrid(gridSize.value);
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

	rangeButton.addEventListener("input", (event) => resetGrid() );
}

makeGrid(document.querySelector("#sizeRange").value);
draw();
clearButtonHandler();
gridSizeHandler();