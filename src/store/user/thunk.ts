import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setAuthenticated, setUserDetails } from './actions';
import { RootState } from '../index';
import { Dispatch } from 'react';

const getToken = () => localStorage.getItem('token') || '';

export const fetchCurrentUser = () => {
	return async (dispatch: Dispatch<any>) => {
		try {
			const token = getToken();
			const response = await fetch('http://localhost:4000/users/me', {
				method: 'GET',
				headers: {
					Accept: '*/*',
					Authorization: token,
				},
			});
			if (response.status === 200) {
				const userDetails = await response.json();
				const role = userDetails.result.role;
				localStorage.setItem('role', role);
				dispatch(setUserDetails(userDetails.result));
				dispatch(setAuthenticated(true));
			} else {
				console.error('Failed to fetch user:');
			}
		} catch (error) {
			console.error('Error fetching current user:', error);
		}
	};
};
