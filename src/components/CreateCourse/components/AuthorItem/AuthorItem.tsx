import React from 'react';
import DeleteIcon from '../../../../assets/DeleteIcon.svg';

interface AuthorItemProps {
	name: string;
	onButtonClick: () => void;
	icon?: string;
}

const AuthorItem: React.FC<AuthorItemProps> = ({
	name,
	onButtonClick,
	icon,
}) => {
	return (
		<div className='author-item'>
			<span className='author-name'>{name}</span>
			<button className='course-delete-author-button' onClick={onButtonClick}>
				<img src={DeleteIcon} alt='' />
			</button>
		</div>
	);
};

export default AuthorItem;
