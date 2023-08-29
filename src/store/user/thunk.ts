import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setAuthenticated, setUserDetails } from './actions';
import { RootState } from '../index';

export const fetchCurrentUser =
	(): ThunkAction<void, RootState, null, AnyAction> =>
	(dispatch: ThunkDispatch<RootState, null, AnyAction>, getState) => {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}
		fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				Accept: '*/*',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data && data.success) {
					dispatch(setUserDetails(data));
					dispatch(setAuthenticated(true));
				} else {
					console.error('Failed to fetch user:', data.message);
				}
			})
			.catch((error) => {
				console.error('Error fetching user:', error);
			});
	};
