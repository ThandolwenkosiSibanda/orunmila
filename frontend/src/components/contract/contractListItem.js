import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { fetchProposal } from '../../actions/proposals';
import { updateOffer, fetchOffers } from '../../actions/offer';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import EndContractModalForm from './endContractModalForm';

const ContractListItem = (props) => {
	const [ content, setContent ] = useState('');
	const [ IsOpen, setIsOpen ] = useState(false);

	const showModal = (e) => {
		setIsOpen(true);
		setContent(e.target.value);
	};

	const hideModal = (e) => {
		setIsOpen(false);
		setContent('');
	};

	const onEndContract = () => {
		// const contract = {};
		// const offerId = this.props._id;
		// contract.load = this.props.load._id;
		// contract.client = this.props.client._id;
		// contract.transporter = this.props.transporter._id;
		// contract.amount = this.props.amount;
		// this.props.onAcceptOffer(contract, offerId);
		console.log('End Contract after the update');
		hideModal();
	};

	const renderName = () => {
		if (props.client && props.client._id == props.currentUser) {
			return <div className="task-name">Transporter : {props.transporter.name}</div>;
		}
		return <div className="task-name">Client : {props.client.name}</div>;
	};

	const checkStatus = () => {
		if (props.clientStatus === 'Open' && props.transporterStatus === 'Open') {
			return (
				<button className="btn btn-outline-danger m-2" value="End Contract" onClick={showModal}>
					End Contract
				</button>
			);
		} else if (
			props.status === 'Closed' &&
			(props.client && props.client._id == props.currentUser) &&
			props.clientStatus === 'Open' &&
			props.transporterStatus === 'Closed'
		) {
			return (
				<button className="btn btn-outline-danger m-2" value="End Contract" onClick={showModal}>
					Rate Transporter
				</button>
			);
		} else if (
			props.status === 'Closed' &&
			(props.transporter && props.transporter._id == props.currentUser) &&
			props.transporterStatus === 'Open' &&
			props.clientStatus === 'Closed'
		) {
			return (
				<button className="btn btn-outline-danger m-2" value="End Contract" onClick={showModal}>
					Rate Client
				</button>
			);
		}
	};

	return (
		<React.Fragment>
			<div className="task-block card">
				<div className="task-details">
					{renderName()}

					<div className="task-name">
						{props.load.from} - {props.load.to}
					</div>
					<div className="task-desc">{props.message}</div>
					<div className="task-types">
						<span>
							<strong>Amount</strong> {props.amount}
						</span>&nbsp;&nbsp;
						<span>
							<strong>Started</strong> {moment(props.createdAt).fromNow()}
						</span>&nbsp;&nbsp;
					</div>
				</div>

				<div className="chat-actions">{checkStatus()}</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal}>
				<EndContractModalForm onSubmit={onEndContract} onHide={hideModal} content={content} contract={props} />
			</Modal>
		</React.Fragment>
	);
};

// class ContractListItem extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			IsOpen  : false,
// 			content : ''
// 		};
// 	}

// 	onEndContract = () => {
// 		// const contract = {};
// 		// const offerId = this.props._id;
// 		// contract.load = this.props.load._id;
// 		// contract.client = this.props.client._id;
// 		// contract.transporter = this.props.transporter._id;
// 		// contract.amount = this.props.amount;
// 		// this.props.onAcceptOffer(contract, offerId);
// 		console.log('End Contract');
// 	};

// 	showModal = (e) => {
// 		this.setState({ IsOpen: true, content: e.target.value });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false, content: '' });
// 	};

// 	renderName = () => {
// 		if (this.props.client && this.props.client._id == this.props.currentUser) {
// 			return <div className="task-name">Transporter : {this.props.transporter.name}</div>;
// 		}
// 		return <div className="task-name">Client : {this.props.client.name}</div>;
// 	};
// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<div className="task-block card">
// 					<div className="task-details">
// 						{this.renderName()}

// 						<div className="task-name">
// 							{this.props.load.from} - {this.props.load.to}
// 						</div>
// 						<div className="task-desc">{this.props.message}</div>
// 						<div className="task-types">
// 							<span>
// 								<strong>Amount</strong> {this.props.amount} {this.props.currency}
// 							</span>&nbsp;&nbsp;
// 							<span>
// 								<strong>Started</strong> {moment(this.props.createdAt).fromNow()}
// 							</span>&nbsp;&nbsp;
// 						</div>
// 					</div>

// 					<div className="chat-actions">
// 						{this.props.clientStatus === 'Open' && this.props.transporterStatus === 'Open' ? (
// 							<button
// 								className="btn btn-outline-danger m-2"
// 								value="End Contract"
// 								onClick={this.showModal}
// 							>
// 								End Contract
// 							</button>
// 						) : (
// 							''
// 						)}
// 					</div>
// 				</div>

// 				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
// 					<EndContractModalForm
// 						onSubmit={this.onEndContract}
// 						onHide={this.hideModal}
// 						content={this.state.content}
// 						contract={this.props}
// 					/>
// 				</Modal>
// 			</React.Fragment>
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
export default connect(mapStateToProps, { fetchProposal, updateOffer, fetchOffers })(ContractListItem);
