import loads from '../apis/backend';

import { SELECT_LOAD, CLEAR_SELECTED_LOAD } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

// SELECT_LOAD
export const selectLoad = (_id) => async (dispatch) => {
	const response = await loads.get(`/api/loads/${_id}`);
	dispatch({ type: SELECT_LOAD, payload: response.data });
};

//CLEAR_LOAD
export const clearSelectedLoad = (_id) => async (dispatch) => {
	dispatch({ type: CLEAR_SELECTED_LOAD, payload: _id });
};
