import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_LOAD
export const addSupportMessage = (formValues) => async (dispatch, getState) => {
	const response = await axios.post('/api/supportMessages', { ...formValues });
	// // dispatch({ type: ADD_LOAD, payload: response.data });
	dispatch({
		type    : 'ADD_FLASHMESSAGE',
		payload : {
			message : 'Thank you for the message. Our Support Team will get in touch with you within 24 hours',
			type    : 'success'
		}
	});

	console.log('This is the message after a successful save');

	history.push('/loads');
};

export const deleteSupportMessage = (loadId) => async (dispatch) => {
	await axios.delete(`/api/loads/${loadId}`);
	dispatch({ type: DELETE_LOAD, payload: loadId });
	history.push('/loads');
};

//UPDATE_LOAD
export const updateSupportMessage = (loadId, formValues) => async (dispatch) => {
	const response = await axios.put(`/api/loads/${loadId}`, formValues);
	dispatch({ type: UPDATE_LOAD, payload: response.data });
	history.push('/loads/myloads/dashboard');
};

// FETCH_LOAD
export const fetchSupportMessage = (loadId) => async (dispatch) => {
	const response = await axios.get(`/api/loads/${loadId}`);
	dispatch({ type: FETCH_LOAD, payload: response.data });
};

// 	FETCH_LOADS
export const fetchSupportMessages = () => async (dispatch, getState) => {
	const { userId } = getState().auth;
	// const response = await loads.get(`/loads/dashboard/${userId}`);
	const response = await axios.get('/api/loads');
	dispatch({ type: FETCH_LOADS, payload: response.data });
};
