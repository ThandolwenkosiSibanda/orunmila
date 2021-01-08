import { ADD_SOCKET, DELETE_SOCKET, FETCH_SOCKET, FETCH_SOCKETS, UPDATE_SOCKET } from './types.js';
import _ from 'lodash';

const SocketsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_SOCKET:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_SOCKET:
			return _.omit(state, action.payload);
		case FETCH_SOCKET:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_SOCKETS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_SOCKET:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};

export default SocketsReducer;
