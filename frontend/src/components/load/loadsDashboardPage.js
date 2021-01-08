import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoadsList from './loadList';
import { setSearchTerm } from '../../actions/loadsFilters';
import LoadsSearchInput from './loadsSearchInput';
import ViewLoadModal from './viewLoadModal';
import { connect } from 'react-redux';
import './loadsDashboard.css';
import history from '../../history';
import FlashMessage from '../flash/index';

const LoadsDashboardPage = (props) => {
	const [ searchTerm, setSearchTerm ] = useState('');

	const handleSearchText = (e) => {
		e.preventDefault();
		props.setSearchTerm(searchTerm);

		history.push('/loads/search');
	};
	return (
		<div>
			<div className="row content-wrapper">
				<div className="col-sm-3 left-bar">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card">
							<div className="card-body">
								<strong>
									<div>Load Preferences</div>
								</strong>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-6 ">
					<div className="card">
						<form>
							<div className="row">
								<div className="col-sm-10 search-input">
									<input
										type="text"
										className="form-control"
										value={searchTerm}
										onChange={(e) => {
											setSearchTerm(e.target.value);
										}}
									/>
								</div>
								<div className="col-sm-2 search-btn-container">
									<button
										type="submit"
										onClick={handleSearchText}
										className="btn btn-primary search-btn"
									>
										Search
									</button>
								</div>
							</div>
						</form>
					</div>

					<div className="content-wrapper">
						<FlashMessage />
						<LoadsList />
					</div>
				</div>
				<div className="col-sm-3 right-bar">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card">
							<div className="card-body">
								<strong>
									<div>Profile Settings </div>
								</strong>
								<h6>Availability</h6>
								<div className="custom-control custom-switch">
									<input type="checkbox" className="custom-control-input" id="customSwitch1" />
									<label className="custom-control-label" htmlFor="customSwitch1">
										On
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// class LoadsDashboardPage extends React.Component {
// 	renderComponentDetails = () => {
// 		return (
// 			<div>
// 				<div className="row content-wrapper">
// 					<div className="col-sm-3 left-bar">
// 						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
// 							<div className="card">
// 								<div className="card-header">
// 									<div className="card-title">Search Settings</div>
// 								</div>
// 								<div className="card-body" />
// 							</div>
// 						</div>
// 					</div>
// 					<div className="col-sm-6 ">
// 						<LoadListFilters />

// 						<div className="content-wrapper">
// 							<LoadsList />
// 						</div>
// 					</div>
// 					<div className="col-sm-3 right-bar">
// 						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
// 							<div className="card">
// 								<div className="card-header">
// 									<div className="card-title">Profile Settings </div>
// 								</div>
// 								<div className="card-body">
// 									<div>Availability</div>
// 									<div className="custom-control custom-switch">
// 										<input type="checkbox" className="custom-control-input" id="customSwitch1" />
// 										<label className="custom-control-label" htmlFor="customSwitch1">
// 											On
// 										</label>
// 									</div>
// 								</div>
// 							</div>
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

export default connect(mapStateToProps, { setSearchTerm })(LoadsDashboardPage);
