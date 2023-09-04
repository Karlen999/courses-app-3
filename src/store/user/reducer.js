import { SET_AUTHENTICATED, SET_USER_DETAILS, LOGOUT_USER } from './types';

const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

const userInitialState = {
	isAuth: Boolean(localStorage.getItem('token')),
	name: localStorage.getItem('name'),
	email: localStorage.getItem('email'),
	role: localStorage.getItem('role') || null,
};
export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return { ...state, isAuth: action.payload };
		case SET_USER_DETAILS:
			return { ...state, ...action.payload };
		case LOGOUT_USER:
			return { ...userInitialState, token: '', isAuth: false };
		default:
			return state;
	}
};

export default userReducer;
