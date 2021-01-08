import { ADD_CHATROOM, DELETE_CHATROOM, UPDATE_CHATROOM, FETCH_CHATROOM, FETCH_CHATROOMS } from './types.js';
import _ from 'lodash';

const ChatroomsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_CHATROOM:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_CHATROOM:
			return _.omit(state, action.payload);
		case FETCH_CHATROOM:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_CHATROOMS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_CHATROOM:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};

export default ChatroomsReducer;
