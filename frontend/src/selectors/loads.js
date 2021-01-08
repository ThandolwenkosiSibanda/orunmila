import _ from 'lodash';

//Get Visible Loads
const getVisibleLoads = (loads, { text, sortBy, startDate, endDate }) => {
	return _.toArray(loads)
		.filter((load) => {
			if (load.description) {
				const textMatch = load.description.toLowerCase().includes(text.toLowerCase());
				return textMatch;
			}
			const textMatch = '';
			return textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === 'amount') {
				return a.estimatedBudget < b.estimatedBudget ? 1 : -1;
			}
		});
};

export default getVisibleLoads;
