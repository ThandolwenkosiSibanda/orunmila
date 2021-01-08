import React, { Component, useState, useEffect } from 'react';
import selectLoads from '../../selectors/loads';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';

import { fetchMyLoads } from '../../actions/myLoads';
import { addReview } from '../../actions/reviews';
import ReviewForm from './reviewForm';
import './reviewDashboard.css';

const ReviewsDashboard = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};
	const onSubmit = (formValues, csv) => {
		setIsOpen(false);
		props.addReview(formValues, csv);
	};

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const renderCreateLoad = () => {
		if (props.isSignedIn) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={showModal}>
							Post A New Load
						</button>
					</div>
				</div>
			);
		}
	};
	const queryString = () => {
		let values = queryString.parse(props.queryString);

		if (values.status === undefined || values.status === null) {
			return 'current';
		}
		return values.status;
	};
	const capitalise = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<React.Fragment>
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">Current Reviews</li>
				</ol>
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={showModal}>
							Create A New Project
						</button>
					</div>
				</div>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">
						<section className="task-list">
							<div className="task-block card">
								<div className="task-details">
									<p>
										<small>#54</small>
									</p>

									<p>
										<small>Lorem ipsum, dolor sit amet, consectetur adipisicing, elit</small>
									</p>
									<div className="task-name">The Lord of the Rings</div>
									<p>
										<small>The Medical Journal Of Science And History</small>
									</p>

									<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1bh-content"
											id="panel1bh-header"
										>
											<button className="btn btn-primary">
												<strong>
													{expanded ? 'Hide Abstract & Ref ID' : 'Show Abstract & Ref ID'}
												</strong>
											</button>
										</AccordionSummary>
										<p className="ref">
											<small>
												<strong>Ref ID: </strong> 10001001
											</small>
										</p>
										<AccordionDetails>
											<div className="task-desc">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
												veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
												commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
												velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
												occaecat cupidatat non proident, sunt in culpa qui officia deserunt
												mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
												adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
												magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
												laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
												in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
												pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
												qui officia deserunt mollit anim id est laborum.
											</div>
										</AccordionDetails>
									</Accordion>
								</div>
							</div>
						</section>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
						<section className="task-list">
							<div className="task-block card">
								<div className="task-details">
									<h6>Vote</h6>

									<div className="table-responsive mt-4">
										<table className=" m-0">
											<thead>
												<tr>
													<th>
														<label className="form-check-label" hmtlfor="inlineRadio3">
															1
														</label>
													</th>
													<th>
														<label className="form-check-label" hmtlfor="inlineRadio3">
															2
														</label>
													</th>
													<th>
														<label className="form-check-label" hmtlfor="inlineRadio3">
															3
														</label>
													</th>
													<th>
														<label className="form-check-label" hmtlfor="inlineRadio3">
															4
														</label>
													</th>
													<th>
														<label className="form-check-label" hmtlfor="inlineRadio3">
															5
														</label>
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<div className="form-check form-check-inline">
															<input
																className="form-check-input"
																type="radio"
																name="inlineRadioOptions"
																id="inlineRadio1"
																value="option1"
															/>
														</div>
													</td>
													<td>
														<div className="form-check form-check-inline">
															<input
																className="form-check-input"
																type="radio"
																name="inlineRadioOptions"
																id="inlineRadio2"
																value="option2"
															/>
														</div>
													</td>
													<td>
														<div className="form-check form-check-inline">
															<input
																className="form-check-input"
																type="radio"
																name="inlineRadioOptions"
																id="inlineRadio3"
																value="option3"
															/>
														</div>
													</td>
													<td>
														<div className="form-check form-check-inline">
															<input
																className="form-check-input"
																type="radio"
																name="inlineRadioOptions"
																id="inlineRadio3"
																value="option3"
															/>
														</div>
													</td>
													<td>
														<div className="form-check form-check-inline">
															<input
																className="form-check-input"
																type="radio"
																name="inlineRadioOptions"
																id="inlineRadio3"
																value="option3"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>

										<button className=" btn btn-primary mt-4 mb-4">Submit Vote</button>
									</div>
								</div>
							</div>
						</section>
					</div>
					<hr />
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<ReviewForm onSubmit={onSubmit} />
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn  : state.auth.isSignedIn,
		queryString : ownProps.location.search
	};
};

export default connect(mapStateToProps, { fetchMyLoads, addReview })(ReviewsDashboard);
