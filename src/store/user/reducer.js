import { SET_AUTHENTICATED, SET_USER_DETAILS, LOGOUT_USER } from './types';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
	role: undefined,
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return { ...state, isAuth: action.payload };
		case SET_USER_DETAILS:
			console.log('Setting user details in Redux:', action.payload);
			return { ...state, ...action.payload };
		case LOGOUT_USER:
			return { ...userInitialState, token: '' };
		default:
			return state;
	}
};

export default userReducer;
