import offers from '../apis/backend';
import history from '../history';

import { ADD_OFFER, DELETE_OFFER, UPDATE_OFFER, FETCH_OFFER, FETCH_OFFERS } from './types.js';

//ADD_LOAD
export const addOffer = (formValues) => async (dispatch, getState) => {
	const response = await offers.post('/api/offers', { ...formValues });
	dispatch({ type: ADD_OFFER, payload: response.data });
};

export const deleteOffer = (offerId) => async (dispatch) => {
	await offers.delete(`/api/offers/${offerId}`);
	dispatch({ type: DELETE_OFFER, payload: offerId });
	// history.push('/loads');
};

//UPDATE_OFFER
export const updateOffer = (offerId, formValues) => async (dispatch) => {
	const response = await offers.put(`/api/offers/${offerId}`, formValues);
	console.log(response.data);
	// dispatch({ type: UPDATE_OFFER, payload: response.data });
	dispatch({ type: DELETE_OFFER, payload: offerId });
	history.push('/offers');
};

// FETCH_LOAD
export const fetchOffer = (offerId) => async (dispatch) => {
	const response = await offers.get(`/api/offers/${offerId}`);
	dispatch({ type: FETCH_OFFER, payload: response.data });
};

// 	FETCH_OFFERS
export const fetchOffers = () => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await offers.get(`/api/offers`);
	dispatch({ type: FETCH_OFFERS, payload: response.data });
};

///

export const getOffers = () => async (dispatch, getState) => {
	dispatch({ type: 'FETCH_OFFERS_REQUEST', payload: { loading: true } });
};
