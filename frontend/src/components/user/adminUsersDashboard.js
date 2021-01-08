import React, { Component } from 'react';
import AdminUsersList from './adminUsersList';
import queryStrings from 'query-string';
import { connect } from 'react-redux';

const AdminUsersDashboard = (props) => {
	const queryString = () => {
		let values = queryStrings.parse(props.queryString);
		console.log('values', values);

		if (values.status === undefined || values.status === null) {
			return 'Approved';
		}
		return values.status;
	};

	const capitalise = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div className="main-container">
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active"> {capitalise(queryString())} Users</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<AdminUsersList userStatus={queryString()} />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps.location.search);
	return {
		isSignedIn  : state.auth.isSignedIn,
		queryString : ownProps.location.search
	};
};
export default connect(mapStateToProps)(AdminUsersDashboard);
