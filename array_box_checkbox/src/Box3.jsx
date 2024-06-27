// This Box.js component will first filter all unique value from array then only create the element and when clicked its becaome activeand turns green

import { useEffect, useRef, useState } from 'react';

const array = [4, 1, 2, 3, 5, 7, 6, 1, 2, 5, 3];

export default function BoxThree() {
	const [selected, setSelected] = useState(new Set());
	const [elements, setElements] = useState([]);
	const [allActivated, setAllActivated] = useState(false);

	const timeoutRef = useRef(null);

	// Effect to filter & set inital array value

	useEffect(() => {
		setElements(new Set([...array]));
	}, []);

	// Effect to handle deactivation when all are active

	useEffect(() => {
		if (allActivated) {
			deActivateBox();
		}
		// Cleanup function to clear timeout
		return () => clearTimeout(timeoutRef.current);
	}, [allActivated]);

	// console.log('UNIQUE ELEMENTS', uniqueElements);

	// Function to deactivate boxes sequentially

	function deActivateBox() {
		// Convert the Set to an array to get the order of activation
		let order = [...selected];

		// Function to deactivate boxes sequentially with a delay
		function deactivateSequentially(index) {
			if (index < order.length) {
				setSelected((prevSelected) => {
					const newSet = new Set(prevSelected);
					newSet.delete(order[index]);
					return newSet;
				});

				// Continue deactivating the next element
				timeoutRef.current = setTimeout(
					() => deactivateSequentially(index + 1),
					600
				);
			}
		}

		// Start deactivation process
		deactivateSequentially(0);
	}

	function handleClick(value) {
		const newSet = new Set(elements);

		// Check if all boxes are active
		if (selected.size + 1 === newSet.size) {
			setAllActivated(true);
		} else {
			setAllActivated(false);
		}

		// Toggle the value in the selected set
		if (!selected.has(value)) {
			setSelected((prevValue) => new Set([...prevValue, value]));
		} else {
			selected.delete(value);
			setSelected((prevValue) => new Set([...prevValue]));
		}
	}

	const uniqueElements = [...elements];

	return (
		<div className="container">
			{uniqueElements.map((value, index) => (
				<div
					key={index}
					className={`box ${selected.has(value) ? 'selected' : ''}`}
					onClick={() => handleClick(value)}>
					{value}
				</div>
			))}
		</div>
	);
}
