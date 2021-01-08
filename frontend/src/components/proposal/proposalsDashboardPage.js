import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProposalList from './proposalList';

import { connect } from 'react-redux';

const ProposalsDashboardPage = (props) => {
	return (
		<div className="main-container">
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">Proposals</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<ProposalList />
					</div>
				</div>
			</div>
		</div>
	);
};
// class ProposalsDashboardPage extends React.Component {
// 	renderCreateLoad = () => {
// 		if (this.props.isSignedIn) {
// 			return (
// 				<div className='row mt-5'>
// 					<div className='col-sm-12'>
// 						<Link className='btn btn-primary' to='/loads/new'>
// 							Proposal
// 						</Link>
// 					</div>
// 				</div>
// 			);
// 		}

// 	};

// 	renderComponentDetails = () => {
// 		return (
// 			<div className='main-container'>
// 				<div className='page-header'>
// 					<ol className='breadcrumb'>
// 						<li className='breadcrumb-item active'>Proposals</li>
// 					</ol>
// 				</div>

// 				<div className='content-wrapper'>
// 					<div className='row gutters'>
// 						<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
// 							<ProposalList />
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

const mapStateToProps = (state) => {
	return {
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps)(ProposalsDashboardPage);
