import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
// The purpose of the connect wrapper is to communicate with the provider in order to get the store

class LoadForm extends Component {
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

				<textarea {...input} className={className} rows="3" />
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
					<option value="USD">USD ($)</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderWeightUnit = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="weightUnit">{this.capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option value="kgs">Kilogrammes (kg)</option>
					<option value="tonnes">Tonnes</option>
					<option value="Metric Tonnes">Metric Tonnes</option>
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
					<h5>Add New Load</h5>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className="">
									<div className="card-body">
										<div className="row gutters">
											<div className="col-xl-6 col-lglg-6 col-md-6 col-sm-6 col-12">
												<Field name="from" component={this.renderInput} />
											</div>
											<div className="col-xl-6 col-lglg-6 col-md-6 col-sm-6 col-12">
												<Field name="to" component={this.renderInput} />
											</div>
											<div className="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">
												<Field
													name="weight"
													component={this.renderInput}
													type="number"
													validate={[ number ]}
												/>
											</div>
											<div className="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">
												<Field name="weightUnit" component={this.renderWeightUnit} />
											</div>
											<div className="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">
												<Field
													name="budget"
													component={this.renderInput}
													type="number"
													validate={[ number ]}
												/>
											</div>
											<div className="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">
												<Field name="currency" component={this.renderCurrency} />
											</div>
											<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
												<Field name="description" component={this.renderTextArea} />
											</div>
										</div>
									</div>

									<div className="modal-footer custom">
										<button
											type="button"
											className="btn btn-link danger"
											onClick={this.props.onHide}
										>
											Cancel
										</button>
										<button type="submit" className="btn btn-link success ">
											Submit Load
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
	if (!formValues.from) {
		errors.from = 'Please enter a valid location of the load';
	}
	if (!formValues.to) {
		errors.to = 'Please enter a valid destination for the load';
	}

	if (!formValues.weight) {
		errors.weight = 'Please enter estimated weight of the load';
	}
	if (!formValues.weightUnit) {
		errors.weightUnit = 'Please choose a unit';
	}
	if (!formValues.budget) {
		errors.budget = 'Please enter your budget for load';
	}
	if (!formValues.currency) {
		errors.currency = 'Please choose a currency';
	}
	if (!formValues.description) {
		errors.description = 'Please enter a valid description for the load';
	}
	return errors;
};

export default reduxForm({
	form     : 'loadForm',
	validate : validate
})(LoadForm);
