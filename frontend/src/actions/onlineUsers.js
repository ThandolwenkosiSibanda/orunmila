import loads from '../apis/backend';
import history from '../history';

import { ADD_ONLINE_USER, DELETE_ONLINE_USER, UPDATE_ONLINE_USER, FETCH_ONLINE_USER, FETCH_ONLINE_USERS } from './types.js';

// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods
// 2. They do not do anything special the just return objects to be called inside the dispatch methods.

//ADD_ONLINE_USER
export const addOnlineUser = (user) => async (dispatch, getState) => {	
	dispatch({ type: ADD_ONLINE_USER, payload: user });	
};


// 	FETCH_ONLINE USERS
export const fetchOnlineUsers = (connectedUsers) => async (dispatch, getState) => {
	dispatch({ type: FETCH_ONLINE_USERS, payload: connectedUsers });
};

// DELETE_ONLINE USER
export const deleteOnlineUser = (user) => async (dispatch) => {
   let userId = user._id;
	dispatch({ type: DELETE_ONLINE_USER, payload: userId });

};

