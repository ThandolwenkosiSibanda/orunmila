import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
// The purpose of the connect wrapper is to communicate with the provider in order to get the store

class AddReviewerForm extends Component {
	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{this.capitalize(input.name)}</label>
				<input {...input} className={className} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<ModalHeader closeButton>
					<h6>Add New Reviewer</h6>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className=" card">
									<div className="card-body">
										<div className="row gutters">
											<div className="col-xl-12 col-lglg-12 col-md-12 col-sm-12 col-12">
												<Field name="email" component={this.renderInput} />
											</div>
										</div>
									</div>

									<div className="modal-footer custom">
										<button
											type="button"
											className="btn btn-link danger"
											onClick={this.props.hideReviewerModal}
										>
											Cancel
										</button>
										<button type="submit" className="btn btn-link success ">
											Add Reviewer
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</ModalBody>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.email) {
		errors.email = 'Please enter a valid email';
	}

	return errors;
};

export default reduxForm({
	form     : 'addReviewerForm',
	validate : validate
})(AddReviewerForm);
