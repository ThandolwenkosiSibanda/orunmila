import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form } from 'redux-form';
import { reduxForm, Field } from 'redux-form';
import { login, logout, signup } from '../../actions/auth';

const Signup = (props) => {
	const onSubmit = (formValues) => {
		props.signup(formValues);
	};

	const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	const renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<input {...input} className={className} autoComplete="off" placeholder={capitalize(input.name)} />
				{renderError(meta)}
			</div>
		);
	};

	return (
		<div className="container">
			<form onSubmit={props.handleSubmit(onSubmit)}>
				<div className="row justify-content-md-center">
					<div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
						<div className="login-screen">
							<div className="login-box">
								<h5>Create your User Account.</h5>
								<div className="form-group">
									<Field name="name" component={renderInput} />
								</div>
								<div className="form-group">
									<Field name="surname" component={renderInput} />
								</div>
								<div className="form-group">
									<Field name="email" component={renderInput} />
								</div>
								<div className="form-group">
									<Field name="password" component={renderInput} />
								</div>
								<div className="actions mb-4 align-left">
									<button type="submit" className="btn btn-primary">
										Signup
									</button>
								</div>
								<hr />
								<div className="actions align-left">
									<span className="additional-link">
										Already Have an account ?
										<Link to={`/login`} className="btn btn-dark">
											Login
										</Link>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

const validate = (formValues) => {
	const errors = {};

	if (!formValues.name) {
		errors.name = 'Please enter a valid name';
	}
	if (!formValues.surname) {
		errors.surname = 'Please enter a valid surname';
	}

	if (!formValues.email) {
		errors.email = 'Please enter a valid email';
	}

	if (!formValues.password) {
		errors.password = 'Please enter a valid password';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'Signup',
	validate : validate
})(Signup);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { login, logout, signup })(formWrapped);
