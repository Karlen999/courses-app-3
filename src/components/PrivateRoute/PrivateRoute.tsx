import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
	const role = useSelector((state: RootState) => state.user.role);

	return role === 'admin' ? <Outlet /> : <Navigate to='/courses' />;
};

export default PrivateRoute;
