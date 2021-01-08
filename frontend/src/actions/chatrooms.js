import chatrooms from '../apis/backend';
import history from '../history';

import { ADD_CHATROOM, DELETE_CHATROOM, UPDATE_CHATROOM, FETCH_CHATROOM, FETCH_CHATROOMS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_CHATROOM
// export const addChatroom = (proposalId, proposalUserId, loadId) => async (dispatch, getState) => {
// 	const { userId } = getState().auth;
// 	const transporterId = proposalUserId;
// 	const clientId = userId;

// 	const response = await chatrooms.post('/chatrooms', { loadId, proposalId, transporterId, clientId });
// 	dispatch({ type: ADD_CHATROOM, payload: response.data });
// 	history.push(`/chatrooms/rooms/${response.data._id}`);
// };

export const addChatroom = (newChatroom) => async (dispatch, getState) => {
	dispatch({ type: ADD_CHATROOM, payload: newChatroom });
	history.push(`/chatrooms/rooms/${newChatroom._id}`);
};
// DELETE_CHATROOM
export const deleteChatroom = (chatroomId) => async (dispatch) => {
	await chatrooms.delete(`/api/chatrooms/${chatroomId}`);
	dispatch({ type: DELETE_CHATROOM, payload: chatroomId });
	history.push('/chatrooms');
};

//UPDATE_CHATROOM
export const updateChatroom = (chatroomId, formValues) => async (dispatch) => {
	const response = await chatrooms.put(`/api/chatrooms/${chatroomId}`, formValues);
	dispatch({ type: UPDATE_CHATROOM, payload: response.data });
	history.push('/chatrooms');
};

// FETCH_CHATROOM
// export const fetchChatroom = (chatroomId) => async (dispatch) => {
// 	const response = await chatrooms.get(`/chatrooms/${chatroomId}`);
// 	dispatch({ type: FETCH_CHATROOM, payload: response.data });
// };

export const fetchChatroom = (foundChatroom) => async (dispatch) => {
	dispatch({ type: FETCH_CHATROOM, payload: foundChatroom });
	history.push(`/chatrooms/rooms/${foundChatroom._id}`);
};

// 	FETCH_chatrooms
export const fetchChatrooms = () => async (dispatch, getState) => {
	const { userId } = getState().auth;

	const response = await chatrooms.get(`/api/chatrooms/user/${userId}`);
	dispatch({ type: FETCH_CHATROOMS, payload: response.data });
};
