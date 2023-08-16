import React from 'react';
import './Input.css';

const Input = ({
	value,
	onChange,
	placeholder,
	type = 'text',
	...otherProps
}) => {
	return (
		<form className='input-form'>
			<input
				className='custom-input'
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				{...otherProps}
			/>
		</form>
	);
};

export default Input;
