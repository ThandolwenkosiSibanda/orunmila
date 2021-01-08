import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { field, reduxForm, Field } from 'redux-form';
import { addCredits } from '../../actions/credits';
import _ from 'lodash';

class AddCreditsPage extends Component {
	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		}
		else {
		}
	};

	capitalize = (s) => s[0].toUpperCase() + s.slice(1);
	renderInput = ({ input, meta }) => {
		const className = `form-control form-control-lg ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			// <div className='form-group'>
			//
			// 	<input {...input} className={className} autoComplete='off' />
			// 	{this.renderError(meta)}
			// </div>

			<div className='form-group'>
				<label htmlFor='amount'>{this.capitalize(input.name)}</label>
				<select {...input} className={className}>
					<option value='null'>~Select Package~</option>
					<option value='1'>1 credit - $1 zwl</option>
					<option value='5'>5 credits - $5 zwl </option>
					<option value='10'>10 credit - $10 zwl</option>
				</select>
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		console.log(this.props);
		this.props.addCredits(formValues);
	};
	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<div className='page-header'>
					<h6 className='text-white'>Buy Credits</h6>
				</div>

				<div className='content-wrapper'>
					<div className='row gutters'>
						<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
							<div className='card h-100'>
								<div className='card-header' />
								<div className='card-body'>
									<div className='row gutters'>
										<div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'>
											<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
												<div className='form-group'>
													<h5>Available Credits</h5>
													<h5>10</h5>
												</div>

												<Field name='amount' component={this.renderInput} />

												<button type='submit' className='btn btn-success mr-1'>
													Pay Via Ecocash
												</button>

												<Link to='/credits' id='submit' name='submit' className='btn btn-dark'>
													Cancel
												</Link>
											</form>
										</div>
										<div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
											<h5>Reminder</h5>
											<p>Credits are the "currency" that we use on the platform</p>
											<p>To apply for Loads</p>
											<p>To Post loads</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
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
	return errors;
};

const formWrapped = reduxForm({
	form     : 'addNewCredits',
	validate
})(AddCreditsPage);

const mapStateToProps = (state, ownProps) => {
	return {
		credits : _.toArray(state.credits)
	};
};

export default connect(mapStateToProps, { addCredits })(formWrapped);
