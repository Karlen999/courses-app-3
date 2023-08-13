import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';

const Header = () => {
	return (
		<header className='app-header'>
			<Logo />
			<Button buttonText='Logout' />
		</header>
	);
};

export default Header;
