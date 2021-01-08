import messages from '../apis/backend';
import history from '../history';
import socket from '../apis/socket';
import _ from 'lodash';

import {
	ADD_MESSAGE,
	DELETE_MESSAGE,
	UPDATE_MESSAGE,
	FETCH_MESSAGE,
	FETCH_MESSAGES,
	UPDATE_CHATROOM_MESSAGES,
	FETCH_CHATROOMS
} from './types.js';
import {
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED,
	MESSAGE_RECEIVED,
	TYPING,
	VERIFY_USER,
	LOGOUT
} from '../socketEvents';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_MESSAGE
export const addMessage = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	console.log(formValues);
	// const response = await messages.post('/api/messages', { ...formValues });
	// dispatch({ type: ADD_MESSAGE, payload: response.data });
};
// DELETE_MESSAGE
export const deleteMessage = (messageId) => async (dispatch) => {
	await messages.delete(`/api/messages/${messageId}`);
	dispatch({ type: DELETE_MESSAGE, payload: messageId });
	history.push('/messages');
};

//UPDATE_MESSAGE
export const updateMessage = (messageId, formValues) => async (dispatch) => {
	const response = await messages.put(`/api/messages/${messageId}`, formValues);
	dispatch({ type: UPDATE_MESSAGE, payload: response.data });
	history.push('/messages');
};

// FETCH_MESSAGE
export const fetchMessage = (messageId) => async (dispatch) => {
	const response = await messages.get(`/api/messages/${messageId}`);
	dispatch({ type: FETCH_MESSAGE, payload: response.data });
};

// 	FETCH_MESSAGES
export const fetchMessages = (chatroomId) => async (dispatch, getState) => {
	const response = await messages.get(`/api/messages/${chatroomId}`);
	/**
 * We receive our data as an array, for consistency lets convert it to an object
 */

	const data = _.keyBy(response.data, '_id');

	dispatch({ type: FETCH_MESSAGES, payload: data });
};

export const updateChatroomMessages = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const data = { ...formValues };
	console.log(
		data.activeChatroom.messages.push({
			_id      : '5f6e1e3dadf37e39b46ac0ce',
			user     : { _id: userId },
			chatroom : formValues.activeChatroom._id,
			content  : formValues.message,
			status   : 'unread'
		})
	);

	// const response = await messages.put(`/api/chatrooms/${chatroomId}`, formValues);
	dispatch({ type: FETCH_CHATROOMS, payload: data });
	// history.push('/chatrooms');
};
