import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { getMyProjects, deleteMyProject } from '../../actions/myprojects';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import _ from 'lodash';
import ReviewersDashboard from './reviewersDashboard';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import './myProjectListItem.css';

const MyProjectListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ LoadId, setLoadId ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ props.project.reviewers && props.project.reviewers.length ]
	);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

	const deleteMyProject = () => {
		hideModal();
		props.deleteMyProject(props.project._id);
	};

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<React.Fragment>
			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
				<section className="task-list">
					<div className="task-block card">
						<div className="task-details">
							<span className=" float-right delete">
								<DeleteOutlinedIcon onClick={showModal} />
							</span>

							<Link to={`/myprojects/${props.project._id}`}>
								<p>
									<small>
										<strong>#ID:</strong> {props.project._id}
									</small>
								</p>
							</Link>

							<Link to={`/myprojects/${props.project._id}`}>
								<div className="task-name"> {props.project.title}</div>
							</Link>
							<p>
								<small>
									<strong>#Threshold:</strong> {props.project.threshold}
								</small>
							</p>

							<p>
								<small>
									<strong>#Created:</strong> {moment(props.project.createdAt).format('MMMM d, YYYY')}
								</small>
							</p>
						</div>
					</div>
				</section>
			</div>

			<ReviewersDashboard project={props.project} />

			<Modal show={IsOpen} onHide={hideModal} size="sm">
				<div className="p-1">
					<div className="page-header">
						<ol className="breadcrumb">
							<li className="breadcrumb-item active">Delete Project </li>
						</ol>
					</div>

					<h6>Are you sure you want to delete this project</h6>

					<button onClick={deleteMyProject} type="button" className="btn btn-secondary" data-dismiss="modal">
						Delete
					</button>
					<button type="button" className="btn btn-primary float-right" onClick={hideModal}>
						Cancel
					</button>
				</div>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { deleteMyProject, getMyProjects })(MyProjectListItem);
