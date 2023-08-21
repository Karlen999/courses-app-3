import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Link } from 'react-router-dom';

type HeaderProps = {
	isLoggedIn: boolean;
	onLogout: () => void;
};

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		onLogout();
	};

	const username = localStorage.getItem('username');

	return (
		<header className='app-header'>
			<Logo />
			<div className='user-section'>
				{isLoggedIn && username ? (
					<span className='username'>{username}</span>
				) : null}
				{isLoggedIn ? (
					<Button buttonText='Logout' onClick={handleLogout} />
				) : (
					<Link to='/login'>
						<Button buttonText='Login' />
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
