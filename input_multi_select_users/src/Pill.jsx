/* eslint-disable react/prop-types */

const Pill = ({ image, text, onClick, email }) => {
	return (
		<div className="tooltip">
			<span className="tooltiptext">{email}</span>
			<span className="user-pill" onClick={onClick}>
				<img src={image} alt={text} />
				<span>{text} 🗙</span>
			</span>
		</div>
	);
};

export default Pill;
