import { ADD_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, FETCH_MESSAGE, FETCH_MESSAGES } from './types.js';
import _ from 'lodash';

const MessagesReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_MESSAGE:
			return _.omit(state, action.payload);
		case FETCH_MESSAGE:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_MESSAGES:
			return { ..._.mapKeys(action.payload, '_id') };
		case UPDATE_MESSAGE:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};

export default MessagesReducer;
