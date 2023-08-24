import { SET_AUTHENTICATED, SET_USER_DETAILS, LOGOUT_USER } from './types';

export const setAuthenticated = (isAuthenticated) => ({
	type: SET_AUTHENTICATED,
	payload: isAuthenticated,
});

export const setUserDetails = (userDetails) => ({
	type: SET_USER_DETAILS,
	payload: userDetails,
});

export const logoutUser = () => ({
	type: LOGOUT_USER,
});
