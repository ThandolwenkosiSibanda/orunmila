import { ADD_CREDITS, FETCH_CREDITS_TOTAL } from './types.js';
import _ from 'lodash';

const CreditsTotalReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CREDITS_TOTAL:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		default:
			return state;
	}
};

export default CreditsTotalReducer;
