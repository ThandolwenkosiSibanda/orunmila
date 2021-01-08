import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './userForm';
import { addUser } from '../../actions/users';

class userDashboard extends Component {
	onSubmitUser = (formValues, avatar, nationalID) => {
		this.props.addUser(formValues, avatar, nationalID);
	};
	renderComponentDetails() {
		const { isSignedIn } = this.props;
		console.log('Authenticated Status', isSignedIn);
		if (!isSignedIn) {
			return (
				<ul className="header-actions">
					<button className="btn btn-outline-primary mt-2 mb-2" onClick={this._handleSignInClick}>
						Login
					</button>
				</ul>
			);
		}
		return (
			<React.Fragment>
				<div className="main-container">
					<div className="page-header">
						<ol className="breadcrumb">
							<li className="breadcrumb-item active">Profile</li>
						</ol>
					</div>

					<div className="content-wrapper">
						<UserForm onSubmitUser={this.onSubmitUser} />
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { addUser })(userDashboard);
