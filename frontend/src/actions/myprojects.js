import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

export const addMyProject = (formValues, csv) => async (dispatch, getState) => {
	console.log('formValues', formValues);
	console.log('csv', csv);

	const data = new FormData();

	const config = {
		headers : {
			'Content-Type' : 'multipart/form-data'
		}
	};

	data.append('csv', csv);
	data.append('title', formValues.title);

	const response = await axios.post('/api/projects', data, config);

	console.log('Reponse', response.data);
	dispatch({ type: 'ADD_PROJECT', payload: response.data });

	history.push('/projects/?status=active');
};

export const deleteMyProject = (projectId) => async (dispatch) => {
	await axios.delete(`/api/projects/${projectId}`);
	dispatch({ type: 'DELETE_MY_PROJECT', payload: projectId });
	history.push('/myprojects/?status=active');
};


export const updateMyProject = (projectId, formValues) => async (dispatch) => {
	const response = await axios.put(`/api/projects/${projectId}`, formValues);
	dispatch({ type: 'UPDATE_MY_PROJECT', payload: response.data });
};

export const fetchMyProjects = (status) => async (dispatch, getState) => {
	const { userId } = getState().auth;

	console.log('status', status);
	const response = await axios.get('/api/myprojects');
	dispatch({ type: 'FETCH_MY_PROJECTS', payload: response.data });
};

export const fetchMyProject = (projectId) => async (dispatch) => {
	console.log('fetchmyproject', projectId);
	const response = await axios.get(`/api/projects/${projectId}`);
	dispatch({ type: 'FETCH_MY_PROJECT', payload: response.data });
};

export const getMyProjects = (status) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_MY_PROJECTS_REQUEST', payload: { loading: true, status: status } });
};

// export const getMyProject = (projectId) => async (dispatch, getState) => {
// 	dispatch({ type: 'FETCH_MY_ARTICLES_REQUEST', payload: { loading: true, projectId: projectId } });
// };
