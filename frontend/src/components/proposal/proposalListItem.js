import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { fetchProposal } from '../../actions/proposals';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import ProposalActionModalForm from './proposalActionModalForm';

const ProposalListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ status, setStatus ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;

			try {
				setStatus(props.status);
			} catch (error) {
				console.log('There was an error', error);
			}
			return () => (isSubscribed = false);
		},
		[ status ]
	);

	const showModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;
		setIsOpen(true);
		setContent(e.target.value);
	};

	const hideModal = () => {
		setIsOpen(false);
		setContent('');
	};

	const onWithdrawProposal = () => {
		const proposalId = props._id;
		props.onWithdrawProposal(proposalId, { status: 'Withdrawn' });
		setStatus('Withdrawn');
		hideModal();
	};

	return (
		<React.Fragment>
			<div className="task-block card">
				<div className="task-details">
					<Link to={`/myproposals/${props._id}`}>
						<div className="task-name">
							Load : {props.load ? props.load.from : ''} - {props.load ? props.load.to : ''}
						</div>

						<div className="task-desc">{props.load ? props.message : ''}</div>
						<div className="task-types">
							<span>
								<strong>Proposal Budget</strong> :{props.load ? props.amount : ''}{' '}
								{props.load ? props.currency : ''}
							</span>&nbsp;&nbsp;
							<span>
								<strong>Submitted</strong> {moment(props.load ? props.createdAt : '').fromNow()}
							</span>
						</div>
					</Link>
				</div>

				<div className="chat-actions">
					<button className="btn btn-outline-danger m-2" value="Withdraw Proposal" onClick={showModal}>
						Withdraw Proposal
					</button>
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal}>
				<ProposalActionModalForm
					onSubmit={content === 'Withdraw Proposal' ? onWithdrawProposal : hideModal}
					onHide={hideModal}
					content={content}
				/>
			</Modal>
		</React.Fragment>
	);
};

// class ProposalListItem extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			IsOpen  : false,
// 			content : ''
// 		};
// 	}
// 	showModal = (e) => {
// 		this.setState({ IsOpen: true, content: e.target.value });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false, content: '' });
// 	};

// 	onWithdrawProposal = () => {
// 		const proposalId = this.props._id;
// 		this.props.onWithdrawProposal(proposalId, { status: 'Withdrawn' });
// 		this.hideModal();
// 	};

// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<div className="task-block card">
// 					<div className="task-details">
// 						<Link to={`/myproposals/${this.props._id}`}>
// 							<div className="task-name">
// 								{console.log(this.props)}
// 								Load : {this.props.load.from} - {this.props.load.to}{' '}
// 							</div>

// 							<div className="task-desc">{this.props.message}</div>
// 							<div className="task-types">
// 								<span>
// 									<strong>Proposal Budget</strong> :{this.props.amount}
// 								</span>&nbsp;&nbsp;
// 								<span>
// 									<strong>Submitted</strong> {moment(this.props.createdAt).fromNow()}
// 								</span>
// 							</div>
// 						</Link>
// 					</div>

// 					<div className="chat-actions">
// 						<button
// 							className="btn btn-outline-danger m-2"
// 							value="Withdraw Proposal"
// 							onClick={this.showModal}
// 						>
// 							Withdraw Proposal
// 						</button>
// 					</div>
// 				</div>

// 				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
// 					<ProposalActionModalForm
// 						onSubmit={this.state.content === 'Withdraw Proposal' ? this.onWithdrawProposal : this.hideModal}
// 						onHide={this.hideModal}
// 						content={this.state.content}
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
export default connect(mapStateToProps, { fetchProposal })(ProposalListItem);
