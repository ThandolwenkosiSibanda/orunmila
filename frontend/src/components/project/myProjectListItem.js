import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { getMyProjects, deleteMyProject, updateMyProject } from '../../actions/myprojects';
import { fetchArticles } from '../../actions/articles';
import MyProjectReports from './myProjectReports';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ReviewersDashboard from './reviewersDashboard';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReactTooltip from 'react-tooltip';
import './myProjectListItem.css';

const MyProjectListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ IsOn, setIsOn ] = useState(false);
	const [ resultsMessage, setResultsMessage ] = useState('');
	const [ LoadId, setLoadId ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;

			try {
				// props.fetchMyProject(props.project._id);
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ props.project.reviewers && props.project.reviewers.length ]
	);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				// props.fetchMyProject(props.project._id);
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				// props.fetchMyProject(props.project._id);
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ props.project.articles && props.project.articles.length ]
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

	const showResultsModal = () => {
		setIsOn(true);
		setResultsMessage('Awaiting Voting From Other Reviewers');
	};

	const hideResultsModal = () => {
		setIsOn(false);
		setResultsMessage('');
	};

	const countObjectKeys = (obj) => {
		return Object.keys(obj).length;
	};

	const CheckIfVotingCompleted = () => {
		let votesCount = props.project.votes ? props.project.votes.length : 0;
		let reviewersCount = props.project.reviewers ? props.project.reviewers.length : 0;
		let articlesCount = props.project.articles ? props.project.articles.length : 0;
		let requiredVotes = reviewersCount * articlesCount;

		if (votesCount >= requiredVotes && reviewersCount >= 3) {
			return <MyProjectReports project={props.project} />;
		}
		return '';
	};

	const ViewResults = () => {
		let votesCount = props.project.votes ? props.project.votes.length : 0;
		let reviewersCount = props.project.reviewers ? props.project.reviewers.length : 0;
		let articlesCount = props.project.articles ? props.project.articles.length : 0;
		let requiredVotes = reviewersCount * articlesCount;

		if (votesCount >= requiredVotes && reviewersCount < 3) {
			return '';
		}
		return (
			<span
				className="badge badge-info float-right pt-2"
				onClick={() => {
					showResultsModal();
				}}
			>
				View Results
			</span>
		);
	};

	const CheckProjectStatus = () => {
		let votesCount = props.project.votes ? props.project.votes.length : 0;
		let reviewersCount = props.project.reviewers ? props.project.reviewers.length : 0;
		let articlesCount = props.project.articles ? props.project.articles.length : 0;
		let requiredVotes = reviewersCount * articlesCount;
		if (votesCount >= requiredVotes && props.project.status === 'active') {
			return props.updateMyProject(props.project._id, { status: 'archived' });
		}
		return '';

		return '';
	};

	return (
		<React.Fragment>
			{countObjectKeys(props.project) > 6 ? (
				<React.Fragment>
					{<CheckProjectStatus />}
					<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
						<section className="task-list">
							<div className="task-block card">
								<div className="task-details">
									<span className=" float-right delete" data-tip="Delete Project">
										<DeleteOutlinedIcon onClick={showModal} />
									</span>

									<span className=" float-right delete" data-tip="Download Report">
										<CheckIfVotingCompleted />
									</span>
									<span className=" float-right delete">
										<ViewResults />
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
									<p>Threshold: {props.project.threshold}</p>

									<p>
										Cast Votes: {props.project.votes ? props.project.votes.length : 0} of{' '}
										{(props.project.reviewers ? parseInt(props.project.reviewers.length) : 0) *
											(props.project.articles ? parseInt(props.project.articles.length) : 0)}
									</p>

									<p>
										Created:
										{moment(props.project.createdAt).format('DD/MM/YYYY')}
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

							<button
								onClick={deleteMyProject}
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Delete
							</button>
							<button type="button" className="btn btn-primary float-right" onClick={hideModal}>
								Cancel
							</button>
						</div>
					</Modal>

					<Modal show={IsOn} onHide={hideResultsModal} size="lg">
						<ModalHeader closeButton>
							<h6>Pending Votes</h6>
						</ModalHeader>
						<div className="p-1">
							<h6 className="p-3">{resultsMessage}</h6>
							<button type="button" className="btn btn-primary float-right" onClick={hideResultsModal}>
								Ok
							</button>
						</div>
					</Modal>
				</React.Fragment>
			) : (
				''
			)}

			<ReactTooltip />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { deleteMyProject, getMyProjects, fetchArticles, updateMyProject })(
	MyProjectListItem
);
