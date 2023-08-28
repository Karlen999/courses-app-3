import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import courseReducer from './courses/reducer';
import authorsReducer from './authors/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	courses: courseReducer,
	authors: authorsReducer,
});

export default rootReducer;
