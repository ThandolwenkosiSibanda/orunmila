import users from '../apis/backend';
import history from '../history';
import { SIGN_IN, SIGN_OUT } from './types';

// export const signIn = (userId) => {
// 	return {
// 		type    : SIGN_IN,
// 		payload : userId
// 	};
// };
export const signOut = () => {
	return {
		type : SIGN_OUT
	};
};

export const signIn = (id_token) => async (dispatch) => {
	const response = await users.post(`/api/users/`, { id_token });
	dispatch({ type: SIGN_IN, payload: response.data });
};
