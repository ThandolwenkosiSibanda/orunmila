import { SIGN_IN, SIGN_OUT } from './types';
import _ from 'lodash';

const INITIAL_STATE = {
	isSignedIn  : null,
	userId      : null,
	userEmail   : null,
	userName    : null,
	userSurname : null
};

const googleAuthReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isSignedIn         : true,
				googleId           : action.payload.googleId,
				userId             : action.payload._id,
				userEmail          : action.payload.email,
				userName           : action.payload.name,
				userSurname        : action.payload.surname,
				verificationStatus : action.payload.status
			};

		// return { ...state, [action.payload._id]: action.payload };
		case SIGN_OUT:
			return {
				...state,
				isSignedIn : false,
				userId     : false
			};

		default:
			return state;
	}
};

export default googleAuthReducer;
