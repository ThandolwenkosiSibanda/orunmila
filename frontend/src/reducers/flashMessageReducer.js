import { ADD_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, FETCH_MESSAGE, FETCH_MESSAGES } from './types.js';
import _ from 'lodash';

const FlashMessagesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_FLASHMESSAGE':
			return { ...state, ...action.payload };
		case 'DELETE_FLASHMESSAGE':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default FlashMessagesReducer;
