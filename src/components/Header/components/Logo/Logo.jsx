import React from 'react';
import logo from '../../../../assets/images/logo.png';
import './Logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link to='/'>
			<img src={logo} alt='Company logo' className='logo' />
		</Link>
	);
};

export default Logo;
