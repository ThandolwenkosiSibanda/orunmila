import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../actions/auth';
import './requireAuth.css';

export default function(ComposedComponent) {
	class AdminAuthentication extends Component {
		componentDidMount() {
			this._checkAndRedirect();
		}

		componentDidUpdate() {
			this._checkAndRedirect();
		}

		_checkAndRedirect() {
			const { userType, redirect } = this.props;

			if (userType !== 'admin') {
				alert('You are not Authorized To Access This Page');
				this.redirect('/');
			}
		}

		redirect() {
			return <Redirect to={{ pathname: '/login' }} />;
		}

		loginPage = () => {
			return (
				<div className="auth-box">
					<div className="row justify-content-md-center">
						<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
							<div className="login-screen">
								<div className="login-box">
									<div className="actions justify-content-center">
										<button className="btn btn-outline-primary">
											<img className="googleBtn" src="" />
											Talk to the admin
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		};

		_handleNotAuthenticated = () => {
			this.props.logout();
		};

		render() {
			const { userType } = this.props;
			return userType === 'admin' ? <ComposedComponent {...this.props} /> : this.loginPage();
		}
	}

	const mapStateToProps = (state, ownProps) => {
		return {
			isSignedIn    : state.auth.isSignedIn,
			currentUserId : state.auth.userId,
			userName      : state.auth.userName,
			userSurname   : state.auth.userSurname,
			userType      : state.auth.userType
		};
	};

	return connect(mapStateToProps, { login, logout })(AdminAuthentication);
}
