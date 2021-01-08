import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

const LoadModal = (props) => {
	const adminButtons = () => {
		if (props.applicationStatus() === true) {
			return (
				<Link className="btn btn-primary mb-1" to={`/myproposals/${props.applicationProposal()}`}>
					View Proposal
				</Link>
			);
		}

		return (
			<React.Fragment>
				<Link
					className="btn btn-primary mb-1"
					to={`/proposals/new/${props.selectedLoad ? props.selectedLoad._id : ''}`}
				>
					Apply For Load
				</Link>
				<p>
					<strong>Required Credits</strong> : 1{' '}
				</p>
				<p>
					{props.currentUserId ? <strong>Available Credits : </strong> : ''} {props.creditsTotal}
				</p>&nbsp;&nbsp;
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<ModalHeader closeButton>{props.content}</ModalHeader>
			<ModalBody>
				<div className="row ">
					<div className="col-xl-9  col-lg-9 col-md-9 col-sm-12">
						<div className="card">
							<div className="card-header">
								<div className="card-title">
									<div className="">
										<h5>
											Transporter: {props.selectedLoad ? props.selectedLoad.from : ''} -
											{props.selectedLoad ? props.selectedLoad.to : ''}
										</h5>
										<p className="divider" />
										<h6>
											Posted :{' '}
											{props.selectedLoad ? moment(props.selectedLoad.createdAt).fromNow() : ''}
										</h6>
									</div>
								</div>
							</div>
							<div className="card-body">
								<p className="card-text">{props.selectedLoad ? props.selectedLoad.description : ''}</p>

								<div className="row">
									<div className="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>
													{props.selectedLoad ? props.selectedLoad.budget : ''}&nbsp;
													{props.selectedLoad ? props.selectedLoad.currency : ''}
												</h6>
												<p>Fixed Price</p>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>
													{props.selectedLoad ? props.selectedLoad.weight : ''}&nbsp;
													{props.selectedLoad ? props.selectedLoad.weightUnit : ''}
												</h6>
												<p>Estimated Weight</p>
											</div>
										</div>
									</div>
								</div>
								<p className="divider" />
								<h6>{props.selectedLoad ? props.selectedLoad.contractType : ''}</h6>
								<p>Contract Type </p>
								<p className="divider" />
								<h6>About The Client</h6>
								<p>
									<strong>Payment Method : </strong> &nbsp; Verified &nbsp;&nbsp;{' '}
								</p>
								<p>
									<strong>Rating : </strong>
									{props.selectedLoad ? props.ratingCount() : ''}
								</p>
								<p>
									<strong>Location : </strong> &nbsp;{props.selectedLoad.user ? props.selectedLoad.user.city : ''}
								</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
						<div className="card">
							<div className="card-body">
								{adminButtons()}

								<div className="divider" />
								<h6>Activity On This Load</h6>
								<p>
									<strong>Proposals : </strong> {props.countProposals()}
								</p>
							</div>
						</div>
					</div>
				</div>
			</ModalBody>
		</React.Fragment>
	);
};

// class LoadModal extends Component {
// 	adminButtons = () => {
// 		if (this.props.applicationStatus() === true) {
// 			return (
// 				<Link className="btn btn-primary mb-1" to={`/myproposals/${this.props.applicationProposal()}`}>
// 					View Proposal
// 				</Link>
// 			);
// 		}

// 		return (
// 			<React.Fragment>
// 				<Link
// 					className="btn btn-primary mb-1"
// 					to={`/proposals/new/${this.props.load ? this.props.load._id : ''}`}
// 				>
// 					Apply For Load
// 				</Link>
// 				<p>
// 					<strong>Required Credits</strong> : 1{' '}
// 				</p>
// 				<p>
// 					<strong>Available Credits</strong> : {this.props.creditsTotal}
// 					<span />
// 				</p>&nbsp;&nbsp;
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return (
// 			<React.Fragment>
// 				<ModalHeader closeButton>{this.props.content}</ModalHeader>
// 				<ModalBody>
// 					<div className="row ">
// 						<div className="col-xl-9  col-lg-9 col-md-9 col-sm-12">
// 							<div className="card">
// 								<div className="card-header">
// 									<div className="card-title">
// 										<div className="">
// 											<h5>
// 												Transporter: {this.props.load ? this.props.load.from : ''} -
// 												{this.props.load ? this.props.load.to : ''}
// 											</h5>
// 											<p className="divider" />
// 											<h6>Posted : {this.props.load ? moment(this.props.load.createdAt).fromNow(): ''}</h6>
// 										</div>
// 									</div>
// 								</div>
// 								<div className="card-body">
// 									<p className="card-text">{this.props.load ? this.props.load.description : ''}</p>

// 									<div className="row">
// 										<div className="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
// 											<div className="">
// 												<div className="stats-detail">
// 													<h6>{this.props.load ? this.props.load.budget : ''}</h6>
// 													<p>Fixed Price</p>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 									<div className="row">
// 										<div className="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
// 											<div className="">
// 												<div className="stats-detail">
// 													<h6>{this.props.load ? this.props.load.weight : ''}</h6>
// 													<p>Estimated Weight</p>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 									<p className="divider" />
// 									<h6>{this.props.load ? this.props.load.contractType : ''}</h6>
// 									<p>Contract Type </p>
// 									<p className="divider" />
// 									<h6>About The Client</h6>
// 									<p>
// 										<strong>Payment Method : </strong> &nbsp; Verified &nbsp;&nbsp;{' '}
// 									</p>
// 									<p>
// 										<strong>Rating : </strong>
// 										{this.props.ratingCount()}
// 									</p>
// 									<p>
// 										<strong>Location : </strong> &nbsp;{this.props.load ? this.props.load.user.city : ''}
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
// 							<div className="card">
// 								<div className="card-body">
// 									{this.adminButtons()}

// 									<div className="divider" />
// 									<h6>Activity On This Load</h6>
// 									<p>
// 										<strong>Proposals : </strong> {this.props.countProposals()}
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</ModalBody>
// 			</React.Fragment>
// 		);
// 	}
// }

const mapStateToProps = (state, ownProps) => {
	let creditsTotal = _.toArray(state.creditsTotal)[0] ? _.toArray(state.creditsTotal)[0].total : 0;
	return {
		currentUserId : state.auth.userId,
		creditsTotal  : creditsTotal,
		load          : _.toArray(state.loads).find((load) => load._id == ownProps.loadId)
	};
};

export default connect(mapStateToProps)(LoadModal);
