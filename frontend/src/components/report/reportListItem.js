import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { fetchProposal } from '../../actions/proposals';
import { updateOffer, fetchOffers } from '../../actions/offer';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import OfferActionModalForm from './offerActionModalForm';

class ReportListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			IsOpen  : false,
			content : ''
		};
	}

	onAcceptOffer = () => {
		const contract = {};
		const offerId = this.props._id;
		contract.load = this.props.load._id;
		contract.client = this.props.client._id;
		contract.transporter = this.props.transporter._id;
		contract.amount = this.props.amount;
		this.props.onAcceptOffer(contract, offerId);
	};

	onDeclineOffer = () => {
		const offerId = this.props._id;
		this.props.onDeclineOffer(offerId, { status: 'Declined' });
	};

	showModal = (e) => {
		this.setState({ IsOpen: true, content: e.target.value });
	};

	hideModal = () => {
		this.setState({ IsOpen: false, content: '' });
	};
	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<div className='task-block'>
					<div className='task-details'>
						<div className='task-name'>
							Offer : {this.props.load.from} - {this.props.load.to}
						</div>

						<div className='task-desc'>{this.props.message}</div>
						<div className='task-types'>
							<span>
								<strong>Amount</strong> {this.props.amount}
							</span>&nbsp;&nbsp;
							<span>
								<strong>Submitted</strong> {moment(this.props.createdAt).fromNow()}
							</span>&nbsp;&nbsp;
							<span>
								<strong>Expires: </strong> {moment(this.props.createdAt).add(1, 'days').calendar()}
							</span>
						</div>
					</div>

					<div className='chat-actions'>
						<button className='btn btn-outline-info' value='Accept Offer' onClick={this.showModal}>
							Accept Offer
						</button>
						<button className='btn btn-outline-danger m-2' value='Decline Offer' onClick={this.showModal}>
							Decline Offer
						</button>
					</div>
				</div>

				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
					<OfferActionModalForm
						onSubmit={this.state.content === 'Accept Offer' ? this.onAcceptOffer : this.onDeclineOffer}
						onHide={this.hideModal}
						content={this.state.content}
					/>
				</Modal>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { fetchProposal, updateOffer, fetchOffers })(ReportListItem);
