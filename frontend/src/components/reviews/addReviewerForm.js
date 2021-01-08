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

	renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{this.capitalize(input.name)}</label>

				<textarea {...input} className={className} rows="12" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderSelect = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="select">{this.capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option>~Select User~</option>
					<option value="25">Thabani Masawi</option>
					<option value="50">Bongekile Mabasa</option>
					<option value="75">Thulile Magada</option>
					<option value="100">Themba Moyo</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	renderComponentDetails = () => {
		if (!this.props) {
			return <div>Loading</div>;
		}

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
												<Field name="reviewer" component={this.renderSelect} />
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
	form     : 'addReviewerForm',
	validate : validate
})(AddReviewerForm);
