import { useState } from 'react';
import './App.css';

function App() {
	const initializeBoard = () => Array(9).fill(null);

	const [board, setBoard] = useState(initializeBoard());
	const [isXturn, setisXTurn] = useState(true);

	const WINNING_PATTERNS = [
		[0, 1, 2], //Row-1
		[6, 7, 8], //Row-2
		[3, 4, 5], //Row-3
		[1, 4, 7], //Col-1
		[0, 3, 6], //Col-2
		[2, 5, 8], //Col-3
		[0, 4, 8], //Diag-1
		[2, 4, 6], //DIag-2
	];

	// const [isXturn, setisXTurn] = useState(false);

	function checkWinner(board) {
		for (const [a, b, c] of WINNING_PATTERNS) {
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				console.log('A B C', a, b, c);
				return board[a]; // Return the winner ('X' or 'O')
			}
		}
		// Check for a draw
		if (board.every((cell) => cell)) {
			return 'Draw';
		}

		return null; // No winner yet
	}

	function handleClick(index) {
		const winner = checkWinner(board);
		if (winner || board[index]) return;

		console.log('WINNERRRR', winner);

		// console.log(isXturn);
		const boardValue = [...board];
		boardValue[index] = isXturn ? 'X' : '0';
		setBoard(boardValue);
		setisXTurn(!isXturn);
	}

	function getStatusMessage() {
		const winner = checkWinner(board);
		if (winner) return `Player ${winner} wins 🎉`;
		if (!board.includes(null)) return `It's a draw!🪢 `;
		return `Player ${isXturn ? 'X' : '0'} turn`;
	}

	function handleReset() {
		setBoard(initializeBoard());
		setisXTurn(true);
	}

	return (
		<>
			<h1> TIC TAC TOE </h1>

			<div className="status">
				{getStatusMessage()}
				<button className="reset-button" onClick={handleReset}>
					Reset Game
				</button>
			</div>

			<div className="grid-container">
				{board.map((value, index) => (
					<button
						className="grid-item"
						key={index}
						onClick={() => handleClick(index)}
						disabled={value !== null}>
						{value}
					</button>
				))}
			</div>
		</>
	);
}

export default App;
