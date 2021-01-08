import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

class ProposalModalForm extends Component {
	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
		// console.log('Accepted Offer');
	};

	render() {
		return (
			<React.Fragment>
				<ModalHeader closeButton>{this.props.content}</ModalHeader>
				<ModalBody>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className='row'>
							<div className='col-sm-12'>
								<h5>Are You Sure You want to {this.props.content}</h5>
							</div>
						</div>

						<div className='modal-footer custom'>
							<button type='button' className='btn btn-link danger' onClick={this.props.onHide}>
								Cancel
							</button>

							<button type='submit' className='btn btn-link success '>
								{this.props.content}
							</button>
						</div>
					</form>
				</ModalBody>
			</React.Fragment>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.message) {
		errors.message = 'Please enter a Message';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'ProposalAction',
	validate : validate
})(ProposalModalForm);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps)(formWrapped);
