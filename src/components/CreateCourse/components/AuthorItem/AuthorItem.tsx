import React from 'react';

interface AuthorItemProps {
	name: string;
	onButtonClick: () => void;
	buttonText: string;
}

const AuthorItem: React.FC<AuthorItemProps> = ({
	name,
	onButtonClick,
	buttonText,
}) => {
	return (
		<div className='author-item'>
			<span className='author-name'>{name}</span>
			<button onClick={onButtonClick}>{buttonText}</button>
		</div>
	);
};

export default AuthorItem;
