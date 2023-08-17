import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
	return (
		<header className='app-header'>
			<Logo />
			{isLoggedIn ? (
				<Button buttonText='Logout' onClick={onLogout} />
			) : (
				<Link to='/login'>
					<Button buttonText='Login' />
				</Link>
			)}
		</header>
	);
};

export default Header;
