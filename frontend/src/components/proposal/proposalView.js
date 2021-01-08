import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import socket from '../../apis/socket';
import { fetchProposal } from '../../actions/proposals';
import { addChatroom, fetchChatrooms, fetchChatroom } from '../../actions/chatrooms';
import {
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED,
	MESSAGE_RECEIVED,
	TYPING,
	VERIFY_USER,
	LOGOUT,
	CREATE_CHATROOM,
	FOUND_CHATROOM,
	NEW_CHATROOM
} from '../../socketEvents';
import ProposalViewSpinner from '../spinners/proposalViewSpinner';

class ProposalView extends Component {
	componentDidMount() {
		this.props.fetchProposal(this.props.match.params.proposalId);
	}

	componentDidUpdate() {
		socket.on(FOUND_CHATROOM, (foundChatroom) => {
			this.props.fetchChatroom(foundChatroom);
			// console.log('found', foundChatroom);
		});

		socket.on(NEW_CHATROOM, (newChatroom) => {
			this.props.addChatroom(newChatroom);
			// console.log(newChatroom);
		});
	}
	messageTransporter = (proposalId, proposalUserId) => {
		// this.props.addChatroom(proposalId, proposalUserId, this.props.proposal.loadId._id);

		const chatroom = {};
		chatroom.load = this.props.proposal.load._id;
		chatroom.proposal = proposalId;
		chatroom.transporter = proposalUserId;
		chatroom.client = this.props.currentUserId;

		socket.emit(CREATE_CHATROOM, { ...chatroom });
	};

	RenderProposalDetails = () => {
		if (!this.props.proposal) {
			return <ProposalViewSpinner />;
		}
		return (
			<React.Fragment>
				<div className="page-header">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active">Proposal Details</li>
					</ol>
				</div>

				<div className="content-wrapper">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
							<div className="card">
								<div className="card-header">
									<h6>Proposal Details</h6>
									<div className="card-title">
										<div className="">
											<p className="divider" />
											<h6>Submitted : {moment(this.props.proposal.createdAt).fromNow()}</h6>
										</div>
									</div>
								</div>
								<div className="card-body">
									<p className="card-text">{this.props.proposal.message}</p>

									<div className="row">
										<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
											<div className="">
												<div className="stats-detail">
													<h6>
														{this.props.proposal.amount} {this.props.proposal.currency}
													</h6>
													<p>Proposed Price</p>
												</div>
											</div>
										</div>
									</div>
									<p className="divider" />
									<div className="row" />
								</div>
							</div>
						</div>

						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
							<div className="card">
								<div className="card-header">
									<h6>Load Details</h6>
									<div className="card-title">
										<div className="">
											<h6>
												Transporter: {this.props.proposal.load.from} To{' '}
												{this.props.proposal.load.to}
											</h6>
											<p className="divider" />
											<h6>Posted :{moment(this.props.proposal.load.createdAt).fromNow()}</h6>
										</div>
									</div>
								</div>
								<div className="card-body">
									<p className="card-text">{this.props.proposal.load.description}</p>

									<div className="row">
										<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
											<div className="">
												<div className="stats-detail">
													<h6>
														{this.props.proposal.load.budget}{' '}
														{this.props.proposal.load.currency}
													</h6>
													<p>Budget Price</p>
												</div>
											</div>
										</div>
										<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
											<div className="">
												<div className="stats-detail">
													<h6>
														{this.props.proposal.load.weight}{' '}
														{this.props.proposal.load.weightUnit}
													</h6>
													<p>Estimated Weight</p>
												</div>
											</div>
										</div>
										<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
											<div className="">
												<div className="stats-detail">
													<h6>One Time Delivery: </h6>
													<p>Contract Type</p>
												</div>
											</div>
										</div>
									</div>
									<p className="divider" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	};

	render() {
		return this.RenderProposalDetails();
	}
}

const mapStateToprops = (state, ownProps) => {
	return {
		proposal      : state.proposals[ownProps.match.params.proposalId],
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToprops, { fetchProposal, addChatroom, fetchChatrooms, fetchChatroom })(ProposalView);
