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
	data.append('threshold', parseInt(formValues.threshold));

	const response = await axios.post('/api/projects', data, config);

	console.log('Reponse', response.data);
	dispatch({ type: 'ADD_MY_PROJECT', payload: response.data });

	history.push(`/myprojects/?status=active`);
};

export const deleteProject = (projectId) => async (dispatch) => {
	await axios.delete(`/api/projects/${projectId}`);
	dispatch({ type: 'DELETE_PROJECT', payload: projectId });
	history.push('/myprojects/?status=active');
};

// 	FETCH_PROJECTS
export const fetchProjects = () => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await axios.get('/api/projects');
	dispatch({ type: 'FETCH_PROJECTS', payload: response.data });
};

export const fetchProject = (projectId) => async (dispatch) => {
	console.log('fetch project', projectId);
	const response = await axios.get(`/api/projects/${projectId}`);
	console.log('fetchedLoad', response.data);
	dispatch({ type: 'FETCH_PROJECT', payload: response.data });
};

export const getProjects = (status) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_PROJECTS_REQUEST', payload: { loading: true, status: status } });
};
