import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import React from 'react';

const useProtectedElement = (
	protectedElement: React.ReactElement
): React.ReactElement => {
	const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);
	return isLoggedIn ? protectedElement : <Navigate to='/login' />;
};

export default useProtectedElement;
