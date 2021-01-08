import axios from '../apis/backend';
import history from '../history';

import { ADD_RATING, DELETE_RATING, UPDATE_RATING, FETCH_RATING, FETCH_RATINGS, DELETE_CONTRACT } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_VOTE
export const addVote = (article, score, reason, project) => async (dispatch, getState) => {
	const response = await axios.post('/api/votes', { article, score, reason, project });
	// dispatch({ type: 'ADD_VOTE', payload: response.data });
	// history.push(`/projects/${projectId}`);
};
