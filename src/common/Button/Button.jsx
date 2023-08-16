import React from 'react';
import './Button.css';

const Button = ({ buttonText, onClick, ...otherProps }) => {
	return (
		<button className='custom-button' onClick={onClick} {...otherProps}>
			{buttonText}
		</button>
	);
};

export default Button;
