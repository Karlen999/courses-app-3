import React from 'react';
import './Input.css';

interface InputProps {
	labelText: string;
	placeholderText?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	value?: string | number;
}

const Input: React.FC<InputProps> = ({
	labelText,
	placeholderText,
	onChange,
	type = 'text',
	value,
}) => {
	return (
		<div className='input-container'>
			<label className='input-label'>{labelText}</label>
			<input
				className='input-field'
				type={type}
				placeholder={placeholderText}
				onChange={onChange}
				value={value}
			/>
		</div>
	);
};

export default Input;
