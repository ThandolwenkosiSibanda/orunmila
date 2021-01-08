import axios from '../apis/backend';
import history from '../history';

import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

export const deleteFlashMessage = () => async (dispatch) => {
	dispatch({ type: 'DELETE_FLASHMESSAGE', payload: { message: '', type: '' } });
};
