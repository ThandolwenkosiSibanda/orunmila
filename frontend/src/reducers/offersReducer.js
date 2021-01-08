import { ADD_OFFER, DELETE_OFFER, UPDATE_OFFER, FETCH_OFFER, FETCH_OFFERS } from './types.js';
import _ from 'lodash';

const OffersReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_OFFER:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_OFFER:
			return _.omit(state, action.payload);
		case FETCH_OFFER:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_OFFERS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_OFFER:
			return { ...state, [action.payload._id]: action.payload };
		case 'FETCH_OFFERS_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_OFFERS_SUCCESS':
			let copy = Object.assign({}, state);
			delete copy.loading;
			return { ...copy, ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_OFFERS_FAILURE':
			return { ...state, loading: 'Error' };
		default:
			return state;
	}
};

export default OffersReducer;
