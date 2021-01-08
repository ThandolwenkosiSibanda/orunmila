import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions/googleAuth';
import TopNav from '../navs/TopNav';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';

class GoogleAuth extends Component {
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
				});
		});
	}

	/**
	 * 
	 * @param {*} isSignedIn 
	 * Handles what happens if there is a login or logout from the application
	 */
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
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};
	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<ul className="header-actions">
					<li className="dropdown">
						<a href="#" id="notifications" data-toggle="dropdown" aria-haspopup="true">
							<i className="icon-bell" />
							<span className="count-label">8</span>
						</a>
						<div className="dropdown-menu dropdown-menu-right lrg" aria-labelledby="notifications">
							<div className="dropdown-menu-header">Notifications (40)</div>
							<ul className="header-notifications">
								<li>
									<a href="#">
										<div className="details">
											<div className="user-title">John Doe</div>
											<div className="noti-details">Delivery Contract has been approved.</div>
											<div className="noti-date">Oct 20, 07:30 pm</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div className="details">
											<div className="user-title">Thabani Masawi</div>
											<div className="noti-details">Load has been successfully delivered..</div>
											<div className="noti-date">Oct 10, 12:00 am</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</li>

					<li className="dropdown">
						<a
							href="#"
							id="userSettings"
							className="user-settings"
							data-toggle="dropdown"
							aria-haspopup="true"
						>
							<span className="user-name">Thandolwenkosi Sibanda</span>
							<span className="avatar">
								T<span className="status busy" />
							</span>
						</a>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="userSettings">
							<div className="header-profile-actions">
								<div className="header-user-profile">
									<div className="header-user">
										<img src="" alt="Admin Template" />
									</div>
									<h5>Thand </h5>
									<h5>Tsina </h5>
									<p>Admin</p>
								</div>
								<a href="user-profile.html">
									<i className="icon-user1" /> My Profile
								</a>
								<a href="account-settings.html">
									<i className="icon-settings1" /> Account Settings
								</a>
								<button onClick={this.onSignOutClick}>
									<i className="icon-log-out1" /> Sign Out
								</button>
							</div>
						</div>
					</li>
				</ul>
			);
		} else {
			return (
				<ul className="header-actions">
					<li>
						<button onClick={this.onSignInClick}>Sign In With Google</button>
					</li>
				</ul>
			);
		}
	}

	render() {
		return (
			<div className="header-items">
				<TopNav />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
