import { useEffect, useState } from 'react';

const array = [4, 1, 2, 3, 5, 7, 6, 1, 2, 5, 3];

export default function Box() {
	const [selected, setSelected] = useState(new Set());
	const [elements, setElements] = useState([]);

	useEffect(() => {
		setElements(new Set([...array]));
	}, []);

	const uniqueElements = [...elements];

	// console.log('UNIQUE ELEMENTS', uniqueElements);

	function handleClick(value) {
		if (!selected.has(value)) {
			setSelected((prevValue) => new Set([...prevValue, value]));
		} else {
			selected.delete(value);
			setSelected((prevValue) => new Set([...prevValue]));
		}
	}

	console.log('SELECTED', selected);

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
