import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { fetchLoad } from '../../actions/loads';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import './loadListItem.css';
import _ from 'lodash';

import LoadModal from './loadModal';

const LoadListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ LoadId, setLoadId ] = useState('');

	// useEffect(
	// 	() => {
	// 		let isSubscribed = true;

	// 		try {
	// 			props.fetchCreditsTotal();
	// 		} catch (error) {
	// 			console.log('There was an error', error);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	},
	// 	[ LoadId ]
	// );

	const showModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
		setLoadId('');
	};

	const checkForProposal = () => {
		let { proposals } = props.load;

		const userProposal = proposals.filter((proposal) => {
			return proposal.user === props.currentUser;
		});

		if (userProposal.length > 0) {
			return <span className="badge badge-info float-right">Applied For Load</span>;
		}
	};

	const countProposals = () => {
		const proposals = props.load.proposals;
		return proposals.length;
	};

	const applicationStatus = () => {
		let { proposals } = props.load;
		const userProposal = proposals.filter((proposal) => {
			return proposal.user === props.currentUser;
		});

		if (userProposal.length > 0) {
			return true;
		}
		// const { proposals } = props.load;
		// if (proposals.filter((proposal) => proposal.user._id === props.currentUser).length > 0) {
		// 	return true;
		// }
	};

	const applicationProposal = () => {
		const proposal = props.load.proposals.filter((proposal) => proposal.user === props.currentUser);

		if (proposal[0]) {
			return proposal[0]._id;
		}
	};

	const userRatingCount = () => {
		const ratings = props.load.user ? props.load.user.ratings : '';
		if (ratings) {
			return ratings.length;
		}
		return 0;
	};

	const userRatingSum = () => {
		const ratings = props.load.user ? props.load.user.ratings : '';

		if (ratings) {
			let ratingTotal = ratings
				.map((rating) => {
					return rating.transporterQualityOfService
						? rating.transporterQualityOfService
						: 0 + rating.transporterCommunication
							? rating.transporterCommunication
							: 0 + rating.transporterAdherenceToSchedule
								? rating.transporterAdherenceToSchedule
								: 0 + rating.transporterCooperation + rating.transporterAvailability
									? rating.transporterCooperation + rating.transporterAvailability
									: 0 + rating.clientQualityOfService
										? rating.clientQualityOfService
										: 0 + rating.clientCommunication
											? rating.clientCommunication
											: 0 + rating.clientAdherenceToSchedule
												? rating.clientAdherenceToSchedule
												: 0 + rating.clientCooperation + rating.transporterAvailability
													? rating.clientCooperation + rating.transporterAvailability
													: 0;
				})
				.reduce((a, b) => a + b, 0);
			return ratingTotal;
		}
		return 0;
	};

	const userRatingCalc = () => {
		let userRating = Math.round(userRatingSum() / userRatingCount());

		switch (userRating) {
			case 1:
				return (
					<React.Fragment>
						<span>
							<strong>Client Rating</strong> &nbsp;&nbsp;
						</span>
						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
					</React.Fragment>
				);
			case 2:
				return (
					<React.Fragment>
						<span>
							<strong>Client Rating</strong> &nbsp;&nbsp;
						</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
					</React.Fragment>
				);
			case 3:
				return (
					<React.Fragment>
						<span>
							<strong>Client Rating</strong> &nbsp;&nbsp;
						</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
					</React.Fragment>
				);
			case 4:
				return (
					<React.Fragment>
						<span>
							<strong>Client Rating</strong> &nbsp;&nbsp;
						</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
					</React.Fragment>
				);
			case 5:
				return (
					<React.Fragment>
						<span>
							<strong>Client Rating</strong> &nbsp;&nbsp;
						</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>
						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
					</React.Fragment>
				);

			default:
				return <span> No Job Rating Yet &nbsp;&nbsp;</span>;
		}
	};

	return (
		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
			<div className="card loadListItem" id={props.load._id} onClick={showModal}>
				<div className="card-header">
					<div className="card-title">Transporter Needed {checkForProposal()} </div>
				</div>
				<div className="card-body">
					<h6>
						<strong>From </strong> : {props.load.from} - <strong>To</strong> : {props.load.to}
					</h6>
					<p className="card-text">{props.load.description}</p>
					<p>
						<span>
							<strong>Estimated Budget</strong> : {props.load.budget} {props.load.currency}
						</span>&nbsp;&nbsp;
						<span>
							<strong>Estimated Weight</strong> : {props.load.weight} {props.load.weightUnit}
						</span>&nbsp;&nbsp;
						<span>
							<strong>Posted</strong> : {moment(props.load.createdAt).fromNow()}
						</span>&nbsp;&nbsp;
					</p>

					{userRatingCalc()}
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<LoadModal
					loadId={props.load._id}
					selectedLoad={props.load}
					applicationStatus={applicationStatus}
					applicationProposal={applicationProposal}
					countProposals={countProposals}
					ratingCount={userRatingCalc}
				/>
			</Modal>
		</div>
	);
};

// class LoadListItem extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		// ({ dispatch, id, from, to, estimatedWeight, estimatedBudget, description })
// 		this.state = {
// 			IsOpen : false,
// 			loadId : ''
// 		};
// 	}

// 	componentDidMount() {
// 		this.props.fetchCreditsTotal();
// 	}

// 	componentDidUpdate(prevProps) {
// 		this.props.fetchCreditsTotal();
// 	}
// 	showModal = (e) => {
// 		e.preventDefault();
// 		const id = e.currentTarget.id;
// 		this.setState({ IsOpen: true, loadId: id });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false, loadId: '' });
// 	};

// 	checkForProposal = () => {
// 		const proposals = this.props.load.proposals;
// 		if (proposals.filter((e) => e.user === this.props.load.currentUser).length > 0) {
// 			return <span className="badge badge-info float-right">Applied For Load</span>;
// 		}
// 	};

// 	countProposals = () => {
// 		const proposals = this.props.load.proposals;
// 		return proposals.length;
// 	};

// 	applicationStatus = () => {
// 		const proposals = this.props.load.proposals;
// 		if (proposals.filter((e) => e.user === this.props.load.currentUser).length > 0) {
// 			return true;
// 		}
// 	};

// 	applicationProposal = () => {
// 		const proposal = this.props.load.proposals.filter((e) => e.user === this.props.currentUser);
// 		return proposal[0]._id;
// 	};

// 	userRatingCount = () => {
// 		const ratings = this.props.load.user ? this.props.load.user.ratings : '';
// 		if (ratings) {
// 			return ratings.length;
// 		}
// 		return 0;
// 	};

// 	userRatingSum = () => {
// 		const ratings = this.props.load.user ? this.props.load.user.ratings : '';

// 		if (ratings) {
// 			let ratingTotal = ratings
// 				.map((rating) => {
// 					return rating.transporterQualityOfService
// 						? rating.transporterQualityOfService
// 						: 0 + rating.transporterCommunication
// 							? rating.transporterCommunication
// 							: 0 + rating.transporterAdherenceToSchedule
// 								? rating.transporterAdherenceToSchedule
// 								: 0 + rating.transporterCooperation + rating.transporterAvailability
// 									? rating.transporterCooperation + rating.transporterAvailability
// 									: 0 + rating.clientQualityOfService
// 										? rating.clientQualityOfService
// 										: 0 + rating.clientCommunication
// 											? rating.clientCommunication
// 											: 0 + rating.clientAdherenceToSchedule
// 												? rating.clientAdherenceToSchedule
// 												: 0 + rating.clientCooperation + rating.transporterAvailability
// 													? rating.clientCooperation + rating.transporterAvailability
// 													: 0;
// 				})
// 				.reduce((a, b) => a + b, 0);
// 			return ratingTotal;
// 		}
// 		return 0;
// 	};

// 	userRatingCalc = () => {
// 		let userRating = Math.round(this.userRatingSum() / this.userRatingCount());

// 		switch (userRating) {
// 			case 1:
// 				return (
// 					<React.Fragment>
// 						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
// 					</React.Fragment>
// 				);
// 			case 2:
// 				return (
// 					<React.Fragment>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
// 					</React.Fragment>
// 				);
// 			case 3:
// 				return (
// 					<React.Fragment>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
// 					</React.Fragment>
// 				);
// 			case 4:
// 				return (
// 					<React.Fragment>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
// 					</React.Fragment>
// 				);
// 			case 5:
// 				return (
// 					<React.Fragment>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>
// 						<span className="star starload checked">&#9733;</span>&nbsp;&nbsp;
// 					</React.Fragment>
// 				);

// 			default:
// 				return <span>No Rating &nbsp;&nbsp;</span>;
// 		}
// 	};
// 	renderComponentDetails = () => {
// 		if (!this.props) {
// 			return <div>Waiting</div>;
// 		}

// 		return (
// 			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
// 				<div className="card loadListItem" id={this.props.load._id} onClick={this.showModal}>
// 					<div className="card-header">
// 						<div className="card-title">
// 							Transporter
// 							{this.checkForProposal()}
// 						</div>
// 					</div>
// 					<div className="card-body">
// 						<h6>
// 							{this.props.load.from} - {this.props.load.to}
// 						</h6>
// 						<span>
// 							<strong>Estimated Budget</strong> :{this.props.load.budget}
// 						</span>&nbsp;&nbsp;
// 						<span>
// 							<strong>Estimated Weight</strong> : {this.props.load.weight}
// 						</span>&nbsp;&nbsp;
// 						<span>
// 							<strong>Posted</strong>
// 						</span>
// 						<p className="card-text">{this.props.load.description}</p>
// 						<h6 className="rating">&nbsp;Rating&nbsp;&nbsp;</h6>
// 						{this.userRatingCalc()}
// 						<h6 className="rating">&nbsp;Location&nbsp;&nbsp;</h6>&nbsp;{this.props.user ? this.props.load.user.city : ''}
// 					</div>
// 				</div>

// 				<Modal show={this.state.IsOpen} onHide={this.hideModal} size="lg">
// 					<LoadModal
// 						loadId={this.props.load._id}
// 						selectedLoad={this.props.load}
// 						applicationStatus={this.applicationStatus}
// 						applicationProposal={this.applicationProposal}
// 						countProposals={this.countProposals}
// 						ratingCount={this.userRatingCalc}
// 					/>
// 				</Modal>
// 			</div>
// 		);
// 	};
// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { fetchLoad, fetchCreditsTotal })(LoadListItem);
