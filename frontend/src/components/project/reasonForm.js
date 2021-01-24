import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
// The purpose of the connect wrapper is to communicate with the provider in order to get the store

class ReasonForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarPreview : null,
			avatar        : null,
			CSV           : null,
			CSVPreview    : null
		};
	}
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
		let csv = this.state.CSV ? this.state.CSV : '';

	
		this.props.onSubmit(formValues, csv);
	};

	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<ModalHeader closeButton>
					<h6>Reason For Scoring Low</h6>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={this.props.handleSubmit(this.props.onSubmitReason)}>
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className=" card">
									<div className="card-body">
										<div className="row gutters">
											<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
												<Field name="reason" component={this.renderInput} />
											</div>
										</div>
									</div>

									<div className="modal-footer custom">
										<button
											type="button"
											className="btn btn-link danger"
											onClick={this.props.hideModal}
										>
											Cancel
										</button>
										<button type="submit" className="btn btn-link success ">
											Submit Reason
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
	if (!formValues.title) {
		errors.title = 'Please enter a valid title';
	}
	if (!formValues.journal) {
		errors.journal = 'Please enter a valid journal name';
	}

	if (!formValues.refID) {
		errors.refID = 'Please enter a valid refID';
	}
	if (!formValues.url) {
		errors.url = 'Please enter a valid url';
	}
	if (!formValues.abstract) {
		errors.abstract = 'Please enter your abstract';
	}
	if (!formValues.threshold || formValues.threshold === '~Select Threshold~') {
		errors.threshold = 'Please choose a threshold';
	}

	return errors;
};

export default reduxForm({
	form     : 'reasonForm',
	validate : validate
})(ReasonForm);
