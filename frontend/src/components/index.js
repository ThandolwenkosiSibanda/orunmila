import React, { Component, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './header/header';
import UnAuthHeader from './header/unauthHeader';

import Footer from './footer/footer';
import { getCurrentUser } from '../actions/auth';

import {
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED,
	MESSAGE_RECEIVED,
	TYPING,
	VERIFY_USER,
	LOGOUT
} from '../socketEvents';
const socketUrl = process.env.NODE_ENV === 'production' ? window.location.hostname : 'http://localhost:4000/';

const Index = (props) => {
	const [ currentUser, setCurrentUser ] = useState(undefined);

	useEffect(() => {
		props.getCurrentUser();
	}, []);

	const changeHeaders = () => {
		if (props.isSignedIn) {
			return <Header />;
		}
		return <UnAuthHeader />;
	};

	return (
		<div>
			{changeHeaders()}
			<Footer />
		</div>
	);
};

const mapStateToprops = (state, ownProps) => {
	return {
		currentUserId : state.auth.userId,
		isSignedIn    : state.auth.isSignedIn
	};
};

export default connect(mapStateToprops, { getCurrentUser })(Index);
