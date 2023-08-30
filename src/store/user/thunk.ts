import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setAuthenticated, setUserDetails } from './actions';
import { RootState } from '../index';

export const fetchCurrentUser =
	(): ThunkAction<void, RootState, null, AnyAction> =>
	async (dispatch: ThunkDispatch<RootState, null, AnyAction>, getState) => {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}
		const data = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				Accept: '*/*',
				Authorization: token,
			},
		});
		const result = await data.json();
		if (result.success) {
			dispatch(setUserDetails(result.result));
			dispatch(setAuthenticated(true));
		} else {
			console.error('Failed to fetch user:');
		}
	};
