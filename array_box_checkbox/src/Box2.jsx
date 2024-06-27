// This Box2.js component will only render element which have value 1 and render inactive element which have value 0
//  and when clicked its becaome activeand turns green

import { useState } from 'react';

const array = [0, 1, 1, 0, 0, 1];

export default function BoxTwo() {
	const [selected, setSelected] = useState(new Set());

	function handleClick(index) {
		if (array[index] === 1 && !selected.has(index)) {
      console.log("IF");
			setSelected((prevValue) => new Set([...prevValue, index]));
		} else {
      console.log("ELSE");
      selected.delete(index)
      setSelected((prevValue) => new Set([...prevValue]));
    }
	}

  console.log('SELECTED', selected);


	return (
		<div className="container">
			{array.map((value, index) => (
				<div
					key={index}
					className={`box 
            ${value === 1 ? 'active' : 'inactive'} 
            ${selected.has(index) && value === 1 ? 'selected' : ''}
            `}
					onClick={() => handleClick(index)}></div>
			))}
		</div>
	);
}
