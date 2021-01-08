import users from '../apis/backend';
import history from '../history';
import axios from 'axios';

import { ADD_USER, DELETE_USER, UPDATE_USER, FETCH_USER, FETCH_USERS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_USER
export const addUser = (formValues) => async (dispatch, getState) => {
	const response = await users.post('/api/users/');
	dispatch({ type: ADD_USER, payload: response.data });
	history.push('/');
};

// DELETE_USER
export const deleteUser = (userId) => async (dispatch) => {
	await users.delete(`/api/users/${userId}`);
	dispatch({ type: DELETE_USER, payload: userId });
	history.push('/loads');
};

//UPDATE_USER
export const updateUser = (userId, formValues) => async (dispatch) => {
	const response = await users.put(`/api/users/${userId}`, formValues);
	dispatch({ type: UPDATE_USER, payload: response.data });
	history.push('/loads/myloads/dashboard');
};

// FETCH_USER
export const fetchUser = (userId) => async (dispatch, getState) => {
	const response = await users.get(`/api/users/userId`);

	dispatch({ type: FETCH_USER, payload: response.data });
};

// 	FETCH_USERS
export const fetchUsers = () => async (dispatch, getState) => {
	const response = await users.get('/api/users');
	dispatch({ type: FETCH_USERS, payload: response.data });
};

///

export const updateUserStatus = (userId, content) => async (dispatch) => {
	console.log('userId', userId);
	console.log('content', content);

	const response = await users.post(`/api/admin/users`, { userId, content });
	dispatch({ type: UPDATE_USER, payload: response.data });
	history.push('/admin/users');
};
