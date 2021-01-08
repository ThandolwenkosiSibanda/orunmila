// Action Generators
// 1. They are functions that return action objects that will be called inside the dispatch methods

// Load Filters
// Change Search Text

export const setBudgets = (budgets) => ({
	type    : 'SET_BUDGETS',
	budgets
});

export const setProposals = (proposals) => ({
	type      : 'SET_PROPOSALS',
	proposals
});

export const setCity = (city) => ({
	type : 'SET_CITY',
	city
});

export const setSearchTerm = (searchTerm = '') => ({
	type       : 'SET_SEARCH_TERM_FILTER',
	searchTerm
});

export const setLoadsTextFilter = (text = '') => ({
	type : 'SET_TEXT_FILTER',
	text
});

//Change to sort by amount
export const sortByAmount = () => ({
	type : 'SORT_BY_AMOUNT'
});

//Change to sort by date
export const sortByDate = () => ({
	type : 'SORT_BY_DATE'
});

export const setStartDate = (date) => ({
	type : 'SET_START_DATE',
	date
});

export const setEndDate = (date) => ({
	type : 'SET_END_DATE',
	date
});
