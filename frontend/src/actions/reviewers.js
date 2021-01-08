import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_LOAD
export const addReviewer = (formValues, projectId) => async (dispatch, getState) => {
	const response = await axios.post('/api/reviewers', { ...formValues, projectId });

	// dispatch({ type: 'ADD_REVIEWER', payload: response.data });
	// dispatch({ type: 'FETCH_MY_PROJECTS_REQUEST', payload: { loading: true } });

	history.push(`/projects`);
};

export const getReviewers = (projectId) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_REVIEWERS_REQUEST', payload: { loading: true, projectId: projectId } });
};
