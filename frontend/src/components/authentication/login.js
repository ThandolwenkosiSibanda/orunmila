import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { reduxForm, Field } from 'redux-form';
import { login, logout, signup } from '../../actions/auth';
import './login.css';

class Login extends Component {
	onSubmit = (formValues) => {
		this.props.login(formValues);
	};

	capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<input {...input} className={className} autoComplete="off" placeholder={this.capitalize(input.name)} />
				{this.renderError(meta)}
			</div>
		);
	};

	renderPasswordInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<input
					{...input}
					className={className}
					autoComplete="off"
					placeholder={this.capitalize(input.name)}
					type="password"
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	render() {
		return (
			<div className="row justify-content-md-center">
				<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className="login-screen">
							<div className="login-box">
								<h5>Please Login to your Account.</h5>

								<div className="form-group">
									<Field name="username" component={this.renderInput} />
								</div>

								<div className="form-group">
									<Field name="password" component={this.renderPasswordInput} />
								</div>

								<div className="actions mb-4 align-left">
									<button type="submit" className="btn btn-primary">
										Login
									</button>
								</div>

								<hr />
								<div className="actions align-left">
									<span className="additional-link">New here ? </span>

									<Link to={`/signup`} className="btn btn-dark">
										Create an Account
									</Link>
								</div>

								<hr />
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.username) {
		errors.username = 'Please enter a valid username';
	}

	if (!formValues.password) {
		errors.password = 'Please enter a valid password';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'Login',
	validate : validate
})(Login);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { login, logout, signup })(formWrapped);
