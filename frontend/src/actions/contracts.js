import contracts from '../apis/backend';
import history from '../history';

import { ADD_CONTRACT, DELETE_CONTRACT, UPDATE_CONTRACT, FETCH_CONTRACT, FETCH_CONTRACTS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_CONTRACT
export const addContract = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;

	const response = await contracts.post('/api/contracts', { ...formValues });
	dispatch({ type: ADD_CONTRACT, payload: response.data });
	history.push('/loads');
};
// DELETE_CONTRACT
export const deleteContract = (contractId) => async (dispatch) => {
	await contracts.delete(`/api/contracts/${contractId}`);
	dispatch({ type: DELETE_CONTRACT, payload: contractId });
	// history.push('/loads');
};

//UPDATE_CONTRACT
export const updateContract = (contractId, formValues) => async (dispatch) => {
	const response = await contracts.put(`/api/contracts/${contractId}`, formValues);
	dispatch({ type: DELETE_CONTRACT, payload: contractId });
};

// FETCH_CONTRACT
export const fetchContract = (contractId) => async (dispatch) => {
	const response = await contracts.get(`/api/contracts/${contractId}`);
	dispatch({ type: FETCH_CONTRACT, payload: response.data });
};

// 	FETCH_CONTRACTS
export const fetchContracts = (status) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await contracts.get(`/api/contracts`);
	dispatch({ type: FETCH_CONTRACTS, payload: response.data });
};

///

///
export const getContracts = (status) => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_CONTRACTS_REQUEST', payload: { loading: true, status: status } });
};
