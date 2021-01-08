import React, { Component } from 'react';
import MyLoadProposalListItem from './myLoadProposalListItem';
import { updateProposal } from '../../actions/proposals';
import { fetchMyLoad } from '../../actions/myLoads';
import { connect } from 'react-redux';

class MyLoadProposalsList extends Component {
	handleRejectProposal = (proposalId) => {
		this.props.updateProposal(proposalId, { status: 'rejected' });
		this.props.fetchMyLoad(this.props._id);
	};

	renderComponentDetails = () => {
		if (!this.props.proposals) {
			return <tr>Loading</tr>;
		}

		return (
			<div className='table-container mt-3'>
				<h6>Proposals </h6>
				<div className='table-responsive'>
					<table className='table'>
						<thead>
							<tr>
								<th>#</th>
								<th>Transporter</th>
								<th>Message</th>
								<th>Amount</th>
								<th colSpan='2'>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.proposals.map((proposal) => (
								<MyLoadProposalListItem
									key={proposal._id}
									{...proposal}
									handleRejectProposal={this.handleRejectProposal}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { updateProposal, fetchMyLoad })(MyLoadProposalsList);
