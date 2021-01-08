import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';

class MyLoadProposalListItem extends Component {
	constructor(props) {
		super(props);
		// ({ dispatch, id, from, to, estimatedWeight, estimatedBudget, description })
		this.state = {
			IsOpen : false,
			loadId : ''
		};
	}

	showModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;
		this.setState({ IsOpen: true, loadId: id });
	};

	hideModal = () => {
		this.setState({ IsOpen: false, loadId: '' });
	};

	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<tr>
					<td />
					<td>{this.props.message}</td>
					<td>{this.props.message}</td>
					<td>
						{this.props.amount} {this.props.currency}
					</td>
					<td>
						<button
							// onClick={() => this.props.handleRejectProposal(this.props._id)}
							onClick={this.showModal}
							className="btn btn-outline-danger"
						>
							<i className="icon-trash" /> Reject Proposal
						</button>
					</td>
					<td>
						<Link to={`/loads/myloads/proposals/${this.props._id}`} className="btn btn-outline-primary">
							<i className="icon-folder" /> View Proposal
						</Link>
					</td>
				</tr>

				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
					<ModalHeader>Reject Proposal</ModalHeader>
					<ModalBody>
						<form onSubmit={this.onSubmit}>
							<div className="row">
								<div className="col-sm-12">
									<h5>Are You Sure You Want To Reject Proposal </h5>
								</div>
							</div>

							<div className="modal-footer custom">
								<button type="button" className="btn btn-link danger" onClick={this.hideModal}>
									Cancel
								</button>

								<button
									type="submit"
									className="btn btn-link success "
									onClick={() => this.props.handleRejectProposal(this.props._id)}
								>
									Confirm
								</button>
							</div>
						</form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

export default MyLoadProposalListItem;
