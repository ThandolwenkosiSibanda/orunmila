import React, { Component } from 'react';
import { connect } from 'react-redux';
import { field, reduxForm, Field } from 'redux-form';
import { addProposal } from '../../actions/proposals';
import Modal from 'react-bootstrap/Modal';
import BuyCreditsModal from '../credit/buyCreditsModal';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import { addCredits } from '../../actions/credits';
import { selectLoad, clearSelectedLoad } from '../../actions/selectedLoad';
import './addProposalPage.css';
import _ from 'lodash';
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

// The purpose of the connect wrapper is to communicate with the provider in order to get the store

class AddProposalPage extends Component {
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

	renderCreditsError = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return <div className="form-group">{this.renderError(meta)}</div>;
	};

	onSubmit = (formValues) => {
		const loadId = this.props.match.params.loadid ? this.props.match.params.loadid : '';

		if (this.props.creditsTotal > 1) {
			this.props.addProposal(formValues, loadId);
		}
	};

	checkCredits = () => {
		if (this.props.creditsTotal < 1) {
			return (
				<React.Fragment>
					<h5 className="error">*Insufficient credits to apply for the load</h5>
				</React.Fragment>
			);
		}
	};

	componentDidMount() {
		const loadId = this.props.match.params.loadid ? this.props.match.params.loadid : '';
		this.props.fetchCreditsTotal();
		this.props.selectLoad(loadId);
	}

	componentDidUpdate() {
		this.props.fetchCreditsTotal();
	}

	componentWillUnmount() {
		this.props.clearSelectedLoad();
	}

	renderComponentDetails = () => {
		return (
			<div>
				<div className="page-header">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active">Add New Proposal</li>
					</ol>
				</div>

				<div className="content-wrapper">
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className="card">
									<div className="card-body">
										<div className="row gutters">
											<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
												{this.checkCredits()}
												<h6 className="p-1 white">Proposal Details</h6>
												<div className="card">
													<div className="card-body">
														<div className="row">
															<div className="col-xl-4 col-lg-4 col-md-4 col-sm-8 col-12">
																<div className="form-group">
																	<label htmlFor="bid">Proposal Bid</label>
																	<p>Amount You are Willing to Get </p>
																</div>
															</div>
															<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
																<Field
																	name="amount"
																	component={this.renderInput}
																	type="number"
																	validate={[ number ]}
																/>
															</div>
															<div className="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">
																<Field
																	name="currency"
																	component={this.renderCurrency}
																/>
															</div>
														</div>

														<Field name="message" component={this.renderTextArea} />

														<button type="submit" className="btn btn-primary mb-2">
															Submit Proposal
														</button>
													</div>
												</div>
											</div>
											<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
												<h6 className="p-1 white">Load Details</h6>

												<div className="card">
													<div className="card-body">
														<div className="row">
															<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
																<div className="form-group">
																	<label htmlFor="from">From</label>
																	<p>
																		{this.props.selectedLoad.payload ? (
																			this.props.selectedLoad.payload.from
																		) : (
																			''
																		)}
																	</p>
																</div>
															</div>
															<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
																<div className="form-group">
																	<label htmlFor="to">To</label>
																	<p>
																		{' '}
																		{this.props.selectedLoad.payload ? (
																			this.props.selectedLoad.payload.to
																		) : (
																			''
																		)}
																	</p>
																</div>
															</div>
															<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
																<div className="form-group">
																	<label htmlFor="estimatedWeight">
																		<p>Estimated Weight</p>
																	</label>
																	<p>
																		{' '}
																		{this.props.selectedLoad.payload ? (
																			this.props.selectedLoad.payload.weight
																		) : (
																			''
																		)}
																	</p>
																</div>
															</div>
															<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
																<div className="form-group">
																	<label htmlFor="estimatedBudget">
																		Estimated Budget
																	</label>
																	<p>
																		{' '}
																		{this.props.selectedLoad.payload ? (
																			this.props.selectedLoad.payload.budget
																		) : (
																			''
																		)}
																	</p>
																</div>
															</div>
														</div>

														<div className="form-group">
															<label htmlFor="description">Load Description</label>
															<p>
																{' '}
																{this.props.selectedLoad.payload ? (
																	this.props.selectedLoad.payload.description
																) : (
																	''
																)}
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.amount) {
		errors.amount = 'Please enter a valid Amount';
	}
	if (!formValues.message) {
		errors.message = 'Please enter a Message';
	}

	if (!formValues.currency) {
		errors.currency = 'Please choose a currency';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'addNewProposal',
	validate : validate
})(AddProposalPage);

const mapStateToProps = (state) => {
	let creditsTotal = _.toArray(state.creditsTotal)[0] ? _.toArray(state.creditsTotal)[0].total : 0;
	return { selectedLoad: state.selectedLoad, creditsTotal: creditsTotal };
};

export default connect(mapStateToProps, { addProposal, selectLoad, clearSelectedLoad, fetchCreditsTotal, addCredits })(
	formWrapped
);
