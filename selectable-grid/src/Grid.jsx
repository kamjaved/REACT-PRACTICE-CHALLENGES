import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Grid = ({ row, column }) => {
	const cells = Array.from({ length: row * column }, (_, i) => i + 1);

	const [selected, setSelected] = useState([]);
	const [isSelectionStart, setSelectionStart] = useState(false);
	const [startCell, setStartCell] = useState(null);

	// handle the pointer when mouse left button is clicked
	function handleMousePress(cell) {
		setSelectionStart(true);
		console.log('PRESSED', cell);
		setStartCell(cell);
		setSelected([cell]);
	}

	console.log('SELCTED', selected);
	// handle the pointer moved onto an element
	function handleMouseEnter(cell) {
		if (isSelectionStart) {
			const newSelection = getSelectedRange(startCell, cell, column);
			setSelected(newSelection);
		}
	}

	// handle the pointer when mouse left button is released
	function handleMouseRelease() {
		setSelectionStart(false);
	}

	// Function to get the selected range with 1-based index
	/*
   For Example a cell number 8 in a 10-column grid:
    start = 8, colCount = 10
    startRow = Math.floor((8 - 1) / 10) = Math.floor(7 / 10) = 0
    startCol = (8 - 1) % 10 = 7 % 10 = 7} start 
   */

	const getSelectedRange = (start, end, colCount) => {
		const startRow = Math.floor((start - 1) / colCount);
		const startCol = (start - 1) % colCount;
		const endRow = Math.floor((end - 1) / colCount);
		const endCol = (end - 1) % colCount;

		const minRow = Math.min(startRow, endRow);
		const maxRow = Math.max(startRow, endRow);
		const minCol = Math.min(startCol, endCol);
		const maxCol = Math.max(startCol, endCol);

		const selectedCells = [];

		for (let row = minRow; row <= maxRow; row++) {
			for (let col = minCol; col <= maxCol; col++) {
				selectedCells.push(row * colCount + col + 1);
			}
		}

		return selectedCells;
	};

	return (
		<div>
			<div
				className="grid-container"
				style={{
					gridTemplateColumns: `repeat(${column}, 45px)`,
					gridTemplateRows: `repeat(${row}, 45px)`,
				}}>
				{cells.map((cell) => (
					<div
						key={cell}
						onMouseEnter={() => handleMouseEnter(cell)}
						onMouseDown={() => handleMousePress(cell)}
						onMouseUp={() => handleMouseRelease(cell)}
						className={`grid-item ${
							selected.includes(cell) ? 'selected' : ''
						}`}>
						{cell}
					</div>
				))}
			</div>
		</div>
	);
};

export default Grid;
