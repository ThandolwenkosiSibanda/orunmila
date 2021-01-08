import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/users';
import { signIn, signOut } from '../actions/googleAuth';

class ProtectedRoute extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId : '601603447021-agr10sb7opbpbelt3c5ojr1cvbdl7bbt.apps.googleusercontent.com',
					scope    : 'email'
				})
				.then(() => {
					/**
					 * We get the instance of the user from the gapi instance
					 */
					this.auth = window.gapi.auth2.getAuthInstance();

					/**
					 * We assign what the component should do if there is any change
					 * If there is any change we call the OnAuthChange method
					 */
					this.onAuthChange(this.auth.isSignedIn.get());
					/**
					 * If the user is signed in
					 * Listen for any changes to the signedIn Status
					 */
					this.auth.isSignedIn.listen(this.onAuthChange);

					// this.checkAuthStatus(this.auth.isSignedIn.get());
				});
		});
	}

	checkAuthStatus = (isSignedIn) => {
		if (isSignedIn) {
			this.props.isSignedIn = true;
		}
		else {
			this.props.isSignedIn = false;
		}
	};

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			/**If the user is signed in, called the *signin action creator* and pass in the .id_token
			 * it is not recommended to just pass in the plain  id to the server for verification as this can be spoofed
			 */
			// this.props.signIn(this.auth.currentUser.get().getId());
			this.props.signIn(this.auth.currentUser.get().getAuthResponse().id_token);

			// var profile = this.auth.currentUser.get().getBasicProfile();
			// console.log('ID: ' + profile.getId());
			// console.log('Full Name: ' + profile.getName());
			// console.log('Given Name: ' + profile.getGivenName());
			// console.log('Family Name: ' + profile.getFamilyName());
			// console.log('Image URL: ' + profile.getImageUrl());
			// console.log('Email: ' + profile.getEmail());
		}
		else {
			this.props.signOut();
		}
	};

	renderComponentDetails = (isSignedIn) => {
		if (this.props.isSignedIn !== null) {
			const Component = this.props.component;
		return 	<Component />;
		}else {
			return <Redirect to={{ pathname: '/login' }} />
		}

		// const isSignedIn = this.props.isSignedIn;
		// console.log(isSignedIn);
		// const Component = this.props.component;
		// return isSignedIn ? <Component /> : <Redirect to={{ pathname: '/login' }} />;

		return '';
	};

	render() {
		return this.renderComponentDetails(this.checkAuthStatus);
	}
}

const mapStateToprops = (state) => {
	return {
		currentUserId : state.auth.userId,
		isSignedIn    : state.auth.isSignedIn
	};
};

export default connect(mapStateToprops, { fetchUser, signIn, signOut })(ProtectedRoute);
