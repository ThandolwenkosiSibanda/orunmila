import loads from '../apis/backend';
import history from '../history';

import { ADD_SOCKET, DELETE_SOCKET, FETCH_SOCKET, FETCH_SOCKETS, UPDATE_SOCKET } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_LOAD
export const addSocket = (socket) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	// const response = await loads.post('/loads', { ...formValues, userId });
	dispatch({ type: ADD_SOCKET, payload: socket });
};

export const deleteSocket = (loadId) => async (dispatch) => {
	await loads.delete(`/api/loads/${loadId}`);
	dispatch({ type: DELETE_SOCKET, payload: loadId });
	history.push('/loads');
};

//UPDATE_LOAD
export const updateSocket = (loadId, formValues) => async (dispatch) => {
	const response = await loads.put(`/api/loads/${loadId}`, formValues);
	dispatch({ type: UPDATE_SOCKET, payload: response.data });
	history.push('/loads/myloads/dashboard');
};

// FETCH_LOAD
export const fetchSocket = (loadId) => async (dispatch) => {
	// dispatch({ type: FETCH_SOCKET, payload: response.data });
};

// 	FETCH_LOADS
export const fetchSockets = () => async (dispatch, getState) => {
	// dispatch({ type: FETCH_SOCKETS, payload: response.data });
};

///
