import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../actions/auth';
import Login from '../components/authentication/login';

import './requireAuth.css';

export default function(ComposedComponent) {
	class Authentication extends Component {
		render() {
			const { isSignedIn, verificationStatus } = this.props;
			return isSignedIn ? <ComposedComponent {...this.props} /> : <Login />;
		}
	}

	const mapStateToProps = (state, ownProps) => {
		return {
			isSignedIn    : state.auth.isSignedIn,
			currentUserId : state.auth.userId,
			userName      : state.auth.userName,
			userSurname   : state.auth.userSurname
		};
	};

	return connect(mapStateToProps, { login, logout })(Authentication);
}
