import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

type ButtonProps = {
	buttonText: string;
	onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
	buttonText,
	onClick,
	...otherProps
}) => {
	return (
		<button className='custom-button' onClick={onClick} {...otherProps}>
			{buttonText}
		</button>
	);
};

export default Button;
