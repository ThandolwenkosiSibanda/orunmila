import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { addCredits, fetchCredits } from '../../actions/credits';
import { connect } from 'react-redux';
import _ from 'lodash';
import './credit.css';
import EcocashLogo from './ecocash.svg';

const BuyCreditsModal = (props) => {
	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
	const renderSelect = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			// <div className='form-group'>
			//
			// 	<input {...input} className={className} autoComplete='off' />
			// 	{this.renderError(meta)}
			// </div>

			<div className="form-group">
				<label htmlFor="amount">{capitalize(input.name)}</label>
				<select {...input} className={className}>
					<option value="1">1 credit - $1 zwl</option>
					<option value="5">5 credits - $5 zwl </option>
					<option value="10">10 credit - $10 zwl</option>
				</select>
				{renderError(meta)}
			</div>
		);
	};

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

	const onSubmit = (formValues) => {
		props.addCredits(formValues);
		props.fetchCredits();
		props.onHide();
	};

	return (
		<React.Fragment>
			<Modal.Header closeButton>
				<h6 className="text-white">Buy Credits</h6>
			</Modal.Header>

			<div className="card ">
				<div className="card-body">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<form onSubmit={props.handleSubmit(onSubmit)}>
								<Field name="amount" component={renderSelect} />
								<Field name="phoneNumber" component={renderInput} />
								<button type="submit" className="btn btn-default mr-1">
									<img className="ecocashlogo" src={EcocashLogo} />
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

// class BuyCreditsModal extends Component {
// 	renderError = ({ error, touched }) => {
// 		if (touched && error) {
// 			return <p style={{ color: 'red' }}>*{error}</p>;
// 		} else {
// 		}
// 	};

// 	capitalize = (s) => s[0].toUpperCase() + s.slice(1);
// 	renderSelect = ({ input, meta }) => {
// 		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
// 		return (
// 			// <div className='form-group'>
// 			//
// 			// 	<input {...input} className={className} autoComplete='off' />
// 			// 	{this.renderError(meta)}
// 			// </div>

// 			<div className="form-group">
// 				<label htmlFor="amount">{this.capitalize(input.name)}</label>
// 				<select {...input} className={className}>
// 					<option value="1">1 credit - $1 zwl</option>
// 					<option value="5">5 credits - $5 zwl </option>
// 					<option value="10">10 credit - $10 zwl</option>
// 				</select>
// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	};

// 	renderInput = ({ input, meta }) => {
// 		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
// 		return (
// 			<div className="form-group">
// 				<label htmlFor="from">{this.capitalize(input.name)}</label>
// 				<input {...input} className={className} autoComplete="off" />
// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	};

// 	onSubmit = (formValues) => {
// 		this.props.addCredits(formValues);
// 		this.props.fetchCredits();
// 		this.props.onHide();
// 	};

// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<Modal.Header closeButton>
// 					<h6 className="text-white">Buy Credits</h6>
// 				</Modal.Header>

// 				<div className="card ">
// 					<div className="card-body">
// 						<div className="row">
// 							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
// 								<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
// 									<Field name="amount" component={this.renderSelect} />
// 									<Field name="phoneNumber" component={this.renderInput} />
// 									<button type="submit" className="btn btn-default mr-1">
// 										<img className="ecocashlogo" src={EcocashLogo} />
// 									</button>
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const validate = (formValues) => {
	const errors = {};
	if (!formValues.amount) {
		errors.amount = 'Please enter a valid Amount';
	}
	if (!formValues.phoneNumber) {
		errors.phoneNumber = 'Please enter a valid Phone Number';
	}
	return errors;
};
const formWrapped = reduxForm({
	form     : 'addNewCredits',
	validate
})(BuyCreditsModal);

const mapStateToProps = (state, ownProps) => {
	return {
		credits : _.toArray(state.credits)
	};
};

export default connect(mapStateToProps, { addCredits, fetchCredits })(formWrapped);
