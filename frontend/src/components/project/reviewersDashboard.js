import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { addReviewer, deleteReviewer } from '../../actions/reviewers';
import { getMyProjects } from '../../actions/myprojects';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import AddReviewerForm from './addReviewerForm';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import _ from 'lodash';

const ReviewersDashboard = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ reviewerId, setReviewerId ] = useState('');
	const [ IsOn, setIsOn ] = useState(false);

	useEffect(() => {
		let isSubscribed = true;
		try {
		} catch (err) {}
		return () => (isSubscribed = false);
	}, []);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ reviewerId ]
	);

	const showModal = (e) => {
		setReviewerId(e.target.id);
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

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

	const deleteMyReviewer = () => {
		props.deleteReviewer(reviewerId, props.project._id);
		hideModal();
	};

	return (
		<React.Fragment>
			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
				<section className="task-list">
					<div className="task-block card">
						<div className="task-details">
							<div className="task-name">Reviewers</div>
							<button className="btn btn-primary float-right " onClick={showAddReviewerModal}>
								Add A Reviewer
							</button>

							{props.project.reviewers &&
								props.project.reviewers.map((reviewer) => {
									return (
										<div className="">
											<span>{reviewer.name} </span>
											<span>{reviewer.surname} </span> &nbsp;
											<span className="delete">
												<DeleteOutlinedIcon onClick={showModal} id={reviewer._id} />
											</span>
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

			<Modal show={IsOpen} onHide={hideModal} size="sm">
				<div className="p-1">
					<div className="page-header">
						<ol className="breadcrumb">
							<li className="breadcrumb-item active">Remove Reviewer</li>
						</ol>
					</div>

					<p>Are you sure you want to remove this reviewer</p>

					<button onClick={deleteMyReviewer} type="button" className="btn btn-secondary" data-dismiss="modal">
						Remove
					</button>
					<button type="button" className="btn btn-primary float-right" onClick={hideModal}>
						Cancel
					</button>
				</div>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, OwnProps) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { addReviewer, deleteReviewer, getMyProjects })(ReviewersDashboard);
