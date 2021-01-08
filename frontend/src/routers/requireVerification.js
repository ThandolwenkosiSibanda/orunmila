import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login, logout } from '../actions/auth';
import './requireAuth.css';

export default function(ComposedComponent) {
	class Verification extends Component {
		componentDidMount() {
			this._checkAndRedirect();
		}

		componentDidUpdate() {
			this._checkAndRedirect();
		}

		_checkAndRedirect() {
			const { isSignedIn, redirect } = this.props;
			console.log('Are we signed In', isSignedIn);

			if (!isSignedIn) {
				this.redirect('/');
				// <Redirect to={{ pathname: '/login' }} />
				console.log('The user is unauthorized');
			}
		}

		redirect() {
			return <Redirect to={{ pathname: '/login' }} />;
		}

		VerificationPage = () => {
			return (
				<div className="auth-box">
					<div className="row justify-content-md-center">
						<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
							<div className="login-screen">
								<div className="login-box">
									<div className="actions justify-content-center">
										{this.props.verificationStatus === 'new' ? (
											<Link className="btn btn-outline-primary" to={`/user/profile`}>
												Complete Profile for Verification
											</Link>
										) : (
											<Link className="btn btn-outline-primary" to={`/user/profile`}>
												Complete Profile For Verification
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		};

		render() {
			const { isSignedIn, verificationStatus } = this.props;
			return verificationStatus === 'Verified' ? <ComposedComponent {...this.props} /> : this.VerificationPage();
		}
	}

	const mapStateToProps = (state, ownProps) => {
		return {
			isSignedIn         : state.auth.isSignedIn,
			verificationStatus : state.auth.verificationStatus,
			currentUserId      : state.auth.userId,
			userName           : state.auth.userName,
			userSurname        : state.auth.userSurname
		};
	};

	return connect(mapStateToProps, { login, logout })(Verification);
}
