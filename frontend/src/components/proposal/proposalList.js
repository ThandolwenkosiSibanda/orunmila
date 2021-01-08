import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ProposalListItem from './proposalListItem';
import selectLoads from '../../selectors/loads';
import ProposalListSpinner from '../spinners/proposalListSpinner';
import axios from '../../apis/backend';
import { fetchProposals, updateProposal, getProposals } from '../../actions/proposals';
import _ from 'lodash';

const ProposalList = (props) => {
	const [ proposals, setProposals ] = useState([]);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState('');

	// useEffect(
	// 	() => {
	// 		let isSubscribed = true;
	// 		setIsLoading(true);
	// 		try {
	// 			axios
	// 				.get(`/api/myproposals/`)
	// 				.then((response) => (isSubscribed ? (setProposals(response.data), setIsLoading(false)) : null));
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			console.log('There was an error', error);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	},
	// 	[ proposals.length ]
	// );

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.getProposals();
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	const onWithdrawProposal = (proposalId, formValue) => {
		props.updateProposal(proposalId, formValue);
	};

	return (
		<React.Fragment>
			{props.loading ? (
				<ProposalListSpinner />
			) : (
				<section className="task-list">
					{props.proposals.map((proposal) => (
						<ProposalListItem key={proposal._id} {...proposal} onWithdrawProposal={onWithdrawProposal} />
					))}
				</section>
			)}
		</React.Fragment>
	);
};

// class ProposalList extends React.Component {
// 	componentDidMount() {
// 		// const userId = this.props.currentUserId ? this.props.currentUserId : '';

// 		if (this.props.currentUserId) {
// 			this.props.fetchProposals();
// 		}
// 	}

// 	componentDidUpdate(prevProps) {
// 		// this.props.fetchCredits();

// 		if (prevProps.currentUserId !== this.props.currentUserId) {
// 			this.props.fetchProposals();
// 		}
// 	}

// 	onWithdrawProposal = (proposalId, formValue) => {
// 		this.props.updateProposal(proposalId, formValue);
// 	};

// 	renderComponentDetails = () => {
// 		if (!this.props.proposals) {
// 			return <div>Loading</div>;
// 		}

// 		return (
// 			<section className="task-list">
// 				{this.props.proposals.map((proposal) => (
// 					<ProposalListItem key={proposal._id} {...proposal} onWithdrawProposal={this.onWithdrawProposal} />
// 				))}
// 			</section>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

//This is the standard way of creating a function that is passed to connect,
// This is the function that determines what to get fro the store and it returns an object
const mapStateToProps = (state) => {
	const loading = state.proposals && state.proposals.loading;
	return {
		proposals     : _.toArray(state.proposals),
		currentUserId : state.auth.userId,
		loading       : loading
	};
};

export default connect(mapStateToProps, { fetchProposals, updateProposal, getProposals })(ProposalList);
