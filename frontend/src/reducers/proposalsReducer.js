import { ADD_PROPOSAL, DELETE_PROPOSAL, UPDATE_PROPOSAL, FETCH_PROPOSAL, FETCH_PROPOSALS } from './types.js';
import _ from 'lodash';

const ProposalsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_PROPOSAL:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_PROPOSAL:
			return _.omit(state, action.payload);
		case FETCH_PROPOSAL:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_PROPOSALS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_PROPOSAL:
			return { ...state, [action.payload._id]: action.payload };
		case 'FETCH_PROPOSALS_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_PROPOSALS_SUCCESS':
			let copy = Object.assign({}, state);
			delete copy.loading;
			return { ...copy, ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_PROPOSALS_FAILURE':
			return { ...state, loading: 'Error' };
		default:
			return state;
	}
};

export default ProposalsReducer;
