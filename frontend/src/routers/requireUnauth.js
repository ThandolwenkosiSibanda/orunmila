import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../actions/auth';
import Project from '../components/project/projectsDashboard';

import './requireAuth.css';

export default function(ComposedComponent) {
	class UnAuthenticated extends Component {
		render() {
			const { isSignedIn, verificationStatus } = this.props;
			return !isSignedIn ? <ComposedComponent {...this.props} /> : <Project />;
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

	return connect(mapStateToProps, { login, logout })(UnAuthenticated);
}
