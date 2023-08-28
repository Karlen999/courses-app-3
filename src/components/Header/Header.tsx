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
	console.log('User state in Header:', user);
	console.log('Role in Header:', user.role);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		dispatch(logoutUser());
	};

	return (
		<header className='app-header'>
			<Logo />
			<div className='user-section'>
				{user.name ? <span className='username'>{user.name}</span> : null}
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
