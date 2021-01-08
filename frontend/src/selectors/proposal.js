import moment from 'moment';
import _ from 'lodash';

//Get Visible Loads
const getSelectedProposal = (proposals, { id }) => {
	return _.toArray(proposals).filter((load) => {
		const selectedProposal = load._id.equals(id);
		return selectedProposal;
	});
};

export default getSelectedProposal;
