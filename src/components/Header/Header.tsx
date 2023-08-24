import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { logoutUser } from '../../store/user/actions';

const Header: React.FC = () => {
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.user);

	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(logoutUser());
	};

	return (
		<header className='app-header'>
			<Logo />
			<div className='user-section'>
				{user.isAuth && user.name ? (
					<span className='username'>{user.name}</span>
				) : null}
				{user.isAuth ? (
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
