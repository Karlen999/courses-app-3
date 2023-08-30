import { SET_AUTHENTICATED, SET_USER_DETAILS, LOGOUT_USER } from './types';

const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
console.log(
	'Role from localStorage during Redux state initialization:',
	JSON.parse(localStorage.getItem('userInfo') || '{}').role
);

const userInitialState = {
	isAuth: !!localStorage.getItem('token'),
	name: storedUserInfo.name || '',
	email: storedUserInfo.email || '',
	token: localStorage.getItem('token') || '',
	role: storedUserInfo.role || '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return { ...state, isAuth: action.payload };
		case SET_USER_DETAILS:
			console.log('Setting user details in Redux:', action.payload);
			return { ...state, ...action.payload };
		case LOGOUT_USER:
			return { ...userInitialState, token: '', isAuth: false };
		default:
			return state;
	}
};

export default userReducer;
