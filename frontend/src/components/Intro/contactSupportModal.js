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

const ContactSupportModal = (props) => {
	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	const renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{capitalize(input.name)}</label>
				<input {...input} className={className} autoComplete="off" />
				{renderError(meta)}
			</div>
		);
	};

	const renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{capitalize(input.name)}</label>

				<textarea {...input} className={className} rows="3" />
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = (formValues) => {
		props.onSubmit(formValues);
	};

	return (
		<React.Fragment>
			<ModalHeader closeButton>
				<h5>Submit Contact Details</h5>
			</ModalHeader>
			<ModalBody>
				<form onSubmit={props.handleSubmit(onSubmit)}>
					<div className="row gutters">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<div className="">
								<div className="card-body">
									<div className="row gutters">
										<div className="col-xl-6 col-lglg-6 col-md-6 col-sm-6 col-12">
											<Field name="email" component={renderInput} />
										</div>
										<div className="col-xl-6 col-lglg-6 col-md-6 col-sm-6 col-12">
											<Field name="phone" component={renderInput} />
										</div>
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<Field name="message" component={renderTextArea} />
										</div>
									</div>
								</div>

								<div className="modal-footer custom">
									<button type="button" className="btn btn-link danger" onClick={props.onHide}>
										Cancel
									</button>
									<button type="submit" className="btn btn-link success ">
										Submit Details
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

const validate = (formValues) => {
	const errors = {};
	if (!formValues.email) {
		errors.email = 'Please enter a valid email address';
	}
	if (!formValues.phone) {
		errors.phone = 'Please enter a valid phone';
	}

	if (!formValues.message) {
		errors.message = 'Please enter a valid';
	}

	return errors;
};

export default reduxForm({
	form     : 'ContactSupport',
	validate : validate
})(ContactSupportModal);
