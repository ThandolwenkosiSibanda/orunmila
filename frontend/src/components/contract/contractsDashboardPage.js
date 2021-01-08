import React, { Component } from 'react';
import ContractList from './contractList';
import queryStrings from 'query-string';
import { connect } from 'react-redux';

const contractsDashboardPage = (props) => {
	const queryString = () => {
		let values = queryStrings.parse(props.queryString);

		if (values.status === undefined || values.status === null) {
			return 'Open';
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
					<li className="breadcrumb-item active"> {capitalise(queryString())} Contracts</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<ContractList status={queryString()} />
					</div>
				</div>
			</div>
		</div>
	);
};

// class contractsDashboardPage extends Component {
// 	renderComponentDetails = () => {
// 		return (
// 			<div className='main-container'>
// 				<div className='page-header'>
// 					<ol className='breadcrumb'>
// 						<li className='breadcrumb-item active'>Contracts</li>
// 					</ol>
// 				</div>

// 				<div className='content-wrapper'>
// 					<div className='row gutters'>
// 						<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
// 							<ContractList />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps.location.search);
	return {
		isSignedIn  : state.auth.isSignedIn,
		queryString : ownProps.location.search
	};
};
export default connect(mapStateToProps)(contractsDashboardPage);
