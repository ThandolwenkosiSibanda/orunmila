import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { addReviewer } from '../../actions/reviewers';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import AddReviewerForm from './addReviewerForm';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import _ from 'lodash';

const ReviewersDashboard = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ LoadId, setLoadId ] = useState('');
	const [ IsOn, setIsOn ] = useState(false);

	useEffect(() => {
		let isSubscribed = true;
		try {
		} catch (err) {}
		return () => (isSubscribed = false);
	}, []);

	const showAddReviewerModal = () => {
		setIsOn(true);
	};

	const hideReviewerModal = () => {
		setIsOn(false);
	};

	const onSubmit = (formValues) => {
		props.addReviewer(formValues, props.project._id);
		setIsOn(false);
	};

	return (
		<React.Fragment>
			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
				<section className="task-list">
					<div className="task-block card">
						<div className="task-details">
							<div className="task-name">Reviewers </div>
							<button className="btn btn-primary float-right " onClick={showAddReviewerModal}>
								Add A Reviewer
							</button>

							{props.project.reviewers &&
								props.project.reviewers.map((reviewer) => {
									return (
										<div className="">
											<span>{reviewer.name} </span>
											<span>{reviewer.surname} </span> &nbsp;
										</div>
									);
								})}
						</div>
					</div>
				</section>
			</div>

			<Modal show={IsOn} onHide={hideReviewerModal} size="sm">
				<AddReviewerForm onSubmit={onSubmit} hideReviewerModal={hideReviewerModal} />
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, OwnProps) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { addReviewer })(ReviewersDashboard);
