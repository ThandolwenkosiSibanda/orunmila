import proposals from '../apis/backend';
import history from '../history';

import { ADD_PROPOSAL, DELETE_PROPOSAL, UPDATE_PROPOSAL, FETCH_PROPOSAL, FETCH_PROPOSALS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_PROPOSAL
export const addProposal = (formValues, load) => async (dispatch, getState) => {
	const response = await proposals.post('/api/proposals', { ...formValues, load });
	dispatch({ type: ADD_PROPOSAL, payload: response.data });
	history.push('/myproposals');
};

export const deleteProposal = (_id) => async (dispatch) => {
	await proposals.delete(`/api/proposals/${_id}`);
	dispatch({ type: DELETE_PROPOSAL, payload: _id });
};

//UPDATE_PROPOSAL
export const updateProposal = (proposalId, formValues) => async (dispatch) => {
	const response = await proposals.put('/api/proposals', { ...formValues, proposalId });
	// dispatch({ type: UPDATE_PROPOSAL, payload: response.data });
	dispatch({ type: DELETE_PROPOSAL, payload: proposalId });
	history.push('/myproposals');
};

// FETCH_PROPOSAL
export const fetchProposal = (proposalId) => async (dispatch) => {
	const response = await proposals.get(`/api/proposals/${proposalId}`);
	dispatch({ type: FETCH_PROPOSAL, payload: response.data });
};

// 	FETCH_PROPOSALS
export const fetchProposals = () => async (dispatch, getState) => {
	const response = await proposals.get(`/api/myproposals/`);
	dispatch({ type: FETCH_PROPOSALS, payload: response.data });
};



///
export const getProposals = () => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_PROPOSALS_REQUEST', payload: { loading: true } });
};