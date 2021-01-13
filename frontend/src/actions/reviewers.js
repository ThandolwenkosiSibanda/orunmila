import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_REVIEWERS
export const addReviewer = (formValues, projectId) => async (dispatch, getState) => {
	const response = await axios.post('/api/reviewers', { ...formValues, projectId });

	// dispatch({ type: 'ADD_REVIEWER', payload: response.data });
	// dispatch({ type: 'FETCH_MY_PROJECTS_REQUEST', payload: { loading: true } });

	history.push(`/projects/?status=active`);
	history.push(`/myprojects/?status=active`);
};

export const deleteReviewer = (reviewerId, projectId) => async (dispatch) => {
	await axios.post(`/api/reviewers/remove`, { reviewerId, projectId });
	dispatch({ type: 'DELETE_REVIEWER', payload: reviewerId });
	history.push('/projects/?status=active');
	history.push(`/myprojects/?status=active`);
};

export const getReviewers = (projectId) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_REVIEWERS_REQUEST', payload: { loading: true, projectId: projectId } });
};
