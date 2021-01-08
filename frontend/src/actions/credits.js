import credits from '../apis/backend';
import history from '../history';

import {
	ADD_CREDITS,
	DELETE_CREDITS,
	UPDATE_CREDITS,
	FETCH_CREDIT,
	FETCH_CREDITS,
	FETCH_CREDITS_TOTAL
} from './types.js';

// 	FETCH_CREDITS
export const fetchCredits = () => async (dispatch) => {
	const response = await credits.get(`/api/credits`);
	dispatch({ type: FETCH_CREDITS, payload: response.data });
	history.push('/credits');
};

// 	ADD_CREDITS
export const addCredits = (formValues) => async (dispatch, getState) => {
	const response = await credits.post('/api/credits', { ...formValues });
	dispatch({ type: ADD_CREDITS, payload: response.data });
	history.push('/');
};

///
export const getCredits = () => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_CREDITS_REQUEST', payload: { loading: true } });
};
