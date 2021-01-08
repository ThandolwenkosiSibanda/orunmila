import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_LOAD
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

	history.push('/projects');
};

// 	FETCH_PROJECTS
export const fetchMyProjects = () => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await axios.get('/api/projects');
	dispatch({ type: 'FETCH_MY_PROJECTS', payload: response.data });
};

// FETCH_PROJECTS
export const fetchMyProject = (projectId) => async (dispatch) => {
	const response = await axios.get(`/api/projects/${projectId}`);
	dispatch({ type: 'FETCH_MY_ARTICLES', payload: response.data });
};

export const getMyProjects = () => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_MY_PROJECTS_REQUEST', payload: { loading: true } });
};

export const getMyProject = (projectId) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_MY_ARTICLES_REQUEST', payload: { loading: true, projectId: projectId } });
};
