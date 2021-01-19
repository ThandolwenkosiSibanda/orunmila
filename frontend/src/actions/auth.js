import axios from '../apis/backend';
import history from '../history';

import { LOGIN, LOGOUT } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_LOAD
export const login = (formValues) => async (dispatch, getState) => {
	console.log('login', formValues);
	const response = await axios.post('/api/login', { ...formValues });

	dispatch({ type: LOGIN, payload: response.data });
};

export const logout = () => async (dispatch) => {
	const response = await axios.get('/api/logout/');

	dispatch({ type: LOGOUT, payload: { isSignedIn: false } });
	history.push('/login');
};

//SIGN_UP
export const signup = (formValues) => async (dispatch, getState) => {
	const response = await axios.post('/api/users', { ...formValues });
	dispatch({ type: LOGIN, payload: response.data });

	history.push('/');
};

//SIGN_UP
export const getCurrentUser = () => async (dispatch, getState) => {
	const response = await axios.get('/api/currentuser');

	dispatch({ type: LOGIN, payload: response.data });
};
