import { LOGIN, LOGOUT } from './types';
import _ from 'lodash';

const INITIAL_STATE = {
	isSignedIn  : null,
	userId      : null,
	userEmail   : null,
	userName    : null,
	userSurname : null
};

const AuthReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isSignedIn         : true,
				googleId           : action.payload.googleId,
				userId             : action.payload._id,
				userEmail          : action.payload.email,
				userName           : action.payload.name,
				userSurname        : action.payload.surname,
				userAddress        : action.payload.address,
				userCity           : action.payload.city,
				userPhone          : action.payload.phone,
				userNationalIdNo   : action.payload.nationalIdNo,
				userNationalID     : action.payload.nationalID,
				userAvatar         : action.payload.avatar,
				verificationStatus : action.payload.status,
				userType           : action.payload.userType
			};

		// return { ...state, [action.payload._id]: action.payload };
		case LOGOUT:
			return {
				...state,
				isSignedIn         : false,
				googleId           : false,
				userId             : false,
				userEmail          : false,
				userName           : false,
				userSurname        : false,
				verificationStatus : false
			};

		default:
			return state;
	}
};

export default AuthReducer;
