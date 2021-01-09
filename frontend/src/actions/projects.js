import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_LOAD
export const addProject = (formValues, csv) => async (dispatch, getState) => {
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
	dispatch({ type: 'ADD_MY_PROJECT', payload: response.data });

	history.push('/myprojects');
};

// 	FETCH_PROJECTS
export const fetchProjects = () => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await axios.get('/api/projects');
	dispatch({ type: 'FETCH_PROJECTS', payload: response.data });
};

// FETCH_PROJECTS
export const fetchProject = (projectId) => async (dispatch) => {
	const response = await axios.get(`/api/projects/${projectId}`);
	dispatch({ type: 'FETCH_ARTICLES', payload: response.data });
};

export const getProjects = (status) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_PROJECTS_REQUEST', payload: { loading: true, status: status } });
};

export const getProject = (projectId) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_ARTICLES_REQUEST', payload: { loading: true, projectId: projectId } });
};
