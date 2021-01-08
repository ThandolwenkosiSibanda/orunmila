import loads from '../apis/backend';
import history from '../history';

import { FETCH_MY_LOAD, FETCH_MY_LOADS, UPDATE_MY_LOAD, DELETE_MY_LOAD } from './types.js';

// FETCH_LOAD
export const fetchMyLoad = (loadId) => async (dispatch, getState) => {
	const response = await loads.get(`/api/myloads/${loadId}`);

	console.log(response.data);
	dispatch({ type: FETCH_MY_LOAD, payload: response.data });
};
// 	FETCH_MY_LOADS
export const fetchMyLoads = (status) => async (dispatch) => {
	const response = await loads.get(`/api/myloads/status/${status}`);

	console.log('myloads', response.data);
	dispatch({ type: FETCH_MY_LOADS, payload: response.data, status: status });
};

//UPDATE_LOAD
export const updateMyLoad = (loadId, formValues) => async (dispatch) => {
	const response = await loads.put(`/api/loads/${loadId}`, formValues);
	// dispatch({ type: UPDATE_MY_LOAD, payload: response.data });
	dispatch({ type: DELETE_MY_LOAD, payload: loadId });
	history.push('/myloads?status=active');
};

// 	GET_MY_LOADS
export const getMyLoads = (status) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_MYLOADS_REQUEST', payload: { loading: true, status: status } });
};
