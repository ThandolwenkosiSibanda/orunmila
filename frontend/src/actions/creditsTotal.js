import credits from '../apis/backend';
import history from '../history';
import { FETCH_CREDITS_TOTAL } from './types.js';

// 	FETCH_CREDITS_TOTALS
export const fetchCreditsTotal = () => async (dispatch, getState) => {
	const { userId } = getState().auth;

	if (userId) {
		const response = await credits.get(`/api/credit/total`);
		dispatch({ type: FETCH_CREDITS_TOTAL, payload: response.data });
	}
};
