import { SELECT_LOAD, CLEAR_SELECTED_LOAD } from './types.js';
import _ from 'lodash';

const SelectedLoadReducer = (state = {}, action) => {
	switch (action.type) {
		case SELECT_LOAD:
			return { state, payload: action.payload };
		case CLEAR_SELECTED_LOAD:
			return {};
		default:
			return state;
	}
};

export default SelectedLoadReducer;
