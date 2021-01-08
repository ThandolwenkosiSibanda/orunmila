import { ADD_CONTRACT, DELETE_CONTRACT, UPDATE_CONTRACT, FETCH_CONTRACT, FETCH_CONTRACTS } from './types.js';
import _ from 'lodash';

const ContractsReducerDefaults = [];

const ContractsReducer = (state = ContractsReducerDefaults, action) => {
	switch (action.type) {
		case ADD_CONTRACT:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_CONTRACT:
			return _.omit(state, action.payload);
		case FETCH_CONTRACT:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_CONTRACTS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_CONTRACT:
			return { ...state, [action.payload._id]: action.payload };
		case 'FETCH_CONTRACTS_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_CONTRACTS_SUCCESS':
			let copy = Object.assign({}, state);
			delete copy.loading;
			return { ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_CONTRACTS_FAILURE':
			return { ...state, loading: 'Error' };
		default:
			return state;
	}
};

export default ContractsReducer;
