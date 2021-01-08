import moment from 'moment';
import _ from 'lodash';
// 4. LoadsFilters
const LoadsFiltersReducerDefaults = {
	text      : '',
	sortBy    : 'date',
	startDate : null,
	endDate   : null,
	budgets   : []
};

const LoadsFiltersReducer = (state = LoadsFiltersReducerDefaults, action) => {
	switch (action.type) {
		case 'SET_BUDGETS':
			return {
				...state,
				budgets : action.budgets
			};
		case 'SET_PROPOSALS':
			return {
				...state,
				proposals : action.proposals
			};

		case 'SET_CITY':
			return {
				...state,
				city : action.city
			};

		case 'SET_SEARCH_TERM_FILTER':
			return {
				...state,
				searchTerm : action.searchTerm
			};

		case 'SEARCH_TERM_FILTER':
			return {
				...state,
				text : action.text
			};
		case 'SET_LOCATION_FILTER':
			return {
				...state,
				text : action.text
			};

		case 'SET_BUDGET_FILTER':
			return {
				...state,
				text : action.text
			};
		case 'SET_PROPOSALS_FILTER':
			return {
				...state,
				text : action.text
			};

		case 'SET_TEXT_FILTER':
			return {
				...state,
				text : action.text
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy : 'date'
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy : 'amount'
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate : action.date
			};
		case 'SET_END_DATE':
			return {
				...state,
				startDate : action.date
			};
		default:
			return state;
	}
};

export default LoadsFiltersReducer;
