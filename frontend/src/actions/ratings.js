import ratings from '../apis/backend';
import history from '../history';

import { ADD_RATING, DELETE_RATING, UPDATE_RATING, FETCH_RATING, FETCH_RATINGS, DELETE_CONTRACT } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_RATING
export const addRating = (formValues) => async (dispatch, getState) => {
	const response = await ratings.post('/api/ratings', { ...formValues });
	dispatch({ type: DELETE_CONTRACT, payload: response.data.contract });
	history.push('/contracts');
};

export const deleteRating = (ratingId) => async (dispatch) => {
	await ratings.delete(`/api/ratings/${ratingId}`);
	dispatch({ type: DELETE_RATING, payload: ratingId });
	history.push('/loads');
};

//UPDATE_RATING
export const updateRating = (ratingId, formValues) => async (dispatch) => {
	const response = await ratings.put(`/api/ratings/${ratingId}`, formValues);
	dispatch({ type: UPDATE_RATING, payload: response.data });
	history.push('/loads/myloads/dashboard');
};

// FETCH_LOAD
export const fetchRating = (ratingId) => async (dispatch) => {
	const response = await ratings.get(`/api/ratings/${ratingId}`);
	dispatch({ type: FETCH_RATING, payload: response.data });
};

// 	FETCH_LOADS
export const fetchRatings = () => async (dispatch, getState) => {
	const response = await ratings.get('/api/ratings');
	dispatch({ type: FETCH_RATINGS, payload: response.data });
};

///
