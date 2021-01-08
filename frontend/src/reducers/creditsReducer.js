import { ADD_CREDITS, FETCH_CREDITS } from './types.js';
import _ from 'lodash';

const CreditsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_CREDITS:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_CREDITS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_CREDITS_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_CREDITS_SUCCESS':
			let copy = Object.assign({}, state);
			delete copy.loading;
			return { ...copy, ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_CREDITS_FAILURE':
			return { ...state, loading: 'Error' };
		default:
			return state;
	}
};

export default CreditsReducer;
