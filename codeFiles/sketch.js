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
			square.style.width = `${420 / gridSize - 2}`;
			square.style.height = `${420 / gridSize - 2}`;
		}
		mainEtchDiv.appendChild(row);
	}
}

makeGrid(50);

// Color Picker
// Grid size
// Reset
// Eraser