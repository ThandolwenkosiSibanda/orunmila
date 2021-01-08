import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

class OfferModalForm extends Component {
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
				<label htmlFor="amount">{this.capitalize(input.name)}</label>
				<input {...input} className={className} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderCurrency = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="currency">{this.capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option value="USD">USD</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="message">{this.capitalize(input.name)}</label>
				<textarea {...input} className={className} placeholder="Type your message here..." />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmitOffer(formValues);
	};

	render() {
		return (
			<React.Fragment>
				<ModalHeader closeButton>New Offer </ModalHeader>
				<ModalBody>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className="row">
							<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
								<Field name="amount" component={this.renderInput} type="number" validate={[ number ]} />
							</div>
							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
								<Field name="currency" component={this.renderCurrency} />
							</div>

							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<Field name="message" component={this.renderTextArea} />
							</div>
						</div>

						<div className="modal-footer custom">
							<button type="button" className="btn btn-link danger" onClick={this.props.hideModal}>
								Cancel
							</button>

							<button type="submit" className="btn btn-link success " onClick={this.props.hideModal}>
								Submit Offer
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

	if (!formValues.amount) {
		errors.amount = 'Please enter an amount';
	}

	if (!formValues.currency) {
		errors.currency = 'Please choose a currency';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'addNewOffer',
	validate : validate
})(OfferModalForm);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps)(formWrapped);
