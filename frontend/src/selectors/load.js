import moment from 'moment';
import _ from 'lodash';

//Get Visible Loads
const getSelectedLoad = (loads, { id }) => {
	return _.toArray(loads).filter((load) => {
		const selectedLoad = load._id.equals(id);
		return selectedLoad;
	});
};

export default getSelectedLoad;
