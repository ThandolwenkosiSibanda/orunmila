import React, { Component } from 'react';
import AdminUsersList from './adminUsersList';
import queryStrings from 'query-string';
import { connect } from 'react-redux';

const AdminDashboard = (props) => {
	return (
		<div className="main-container">
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">Admin Dashboard</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">Admin Dashboard</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn : state.auth.isSignedIn
	};
};
export default connect(mapStateToProps)(AdminDashboard);
