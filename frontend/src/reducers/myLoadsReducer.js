import { FETCH_MY_LOAD, FETCH_MY_LOADS, UPDATE_MY_LOAD, DELETE_MY_LOAD, ADD_MY_LOAD } from './types.js';
import _ from 'lodash';

const MyLoadsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_MY_LOAD:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_MY_LOAD:
			return _.omit(state, action.payload);
		case FETCH_MY_LOAD:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_MY_LOADS:
			state = {};
			return {
				...state,
				..._.mapKeys(action.payload, '_id')
			};
		case UPDATE_MY_LOAD:
			return { ...state, [action.payload._id]: action.payload };
		case 'FETCH_MYLOADS_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_MYLOADS_SUCCESS':
			let copy = Object.assign({}, state);
			delete copy.loading;
			return { ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_MYLOADS_FAILURE':
			return { ...state, loading: 'Error' };
		default:
			return state;
	}
};

export default MyLoadsReducer;
