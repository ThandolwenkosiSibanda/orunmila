import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ReasonForm from './reasonForm';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { addVote } from '../../actions/votes';

import { deleteArticle, updateArticle } from '../../actions/articles';

// The purpose of the connect wrapper is to communicate with the provider in order to get the store

const ArticleVote = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ score, setScore ] = useState(0);
	const [ reason, setReason ] = useState('');
	const [ voted, setVoted ] = useState(false);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ voted ]
	);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};
	const onSubmit = () => {
		// props.addReview(formValues, props.articleId);

		setVoted(true);

		props.addVote(props.articleId, score, reason, props.projectId);
	};

	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	const renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{capitalize(input.name)}</label>
				<input {...input} className={className} autoComplete="off" />
				{renderError(meta)}
			</div>
		);
	};
	const renderRadioButton = ({ input, meta }) => {
		return (
			<div className="form-check form-check-inline">
				<input
					className="form-check-input"
					type="radio"
					name="inlineRadioOptions"
					id="inlineRadio2"
					value="1"
				/>
			</div>
		);
	};
	const checkIfVoted = () => {
		console.log('article votes', props.article.votes);
		if (props.article.votes && props.article.votes.length > 0) {
			let reviewers = props.article.votes.map((vote) => {
				return vote.reviewer;
			});

			let currentUser = [ props.currentUserId ];
			let filtered = reviewers.filter((reviewer) => currentUser.includes(reviewer));
			if (filtered.length > 0) {
				setVoted(true);
				return '';
			} else {
				return '';
			}
		}
	};

	const onSubmitReason = (formValues) => {
		setReason(formValues.reason);
		hideModal();
	};

	const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	const CheckIfPassedThreshold = () => {
		if (props.article.votes && props.article.votes.length > 0) {
			let votesCount = props.article.votes.map((vote) => {
				return vote;
			});

			let voteScore = props.article.votes.map((vote) => vote.score).reduce((prev, next) => prev + next);

			let threshold = props.article.threshold;

			console.log('check ', voteScore * 20 * votesCount.length);

			let averageScore = voteScore * 20 / votesCount.length;

			console.log('average score', averageScore);
			console.log('threshold', threshold);
			console.log('votesCount', votesCount.length);
			console.log('voteScore', voteScore);

			if (votesCount.length >= 3 && averageScore < threshold && props.article.status === 'active') {
				props.updateArticle(props.article._id, { status: 'rejected' });
			}

			if (votesCount.length >= 3 && averageScore >= threshold && props.article.status === 'active') {
				props.updateArticle(props.article._id, { status: 'accepted' });
			}
		}
	};

	return (
		<React.Fragment>
			<section className="task-list">
				{CheckIfPassedThreshold()}
				{voted ? (
					<div className="task-block card">
						<div className="task-details">
							<div className="table-responsive mt-4">
								<button className=" btn btn-primary" disabled="disabled">
									Vote Submitted
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="task-block card">
						<div className="task-details">
							<h6>Votes {checkIfVoted()} </h6>

							<div className="table-responsive mt-4">
								<form onSubmit={props.handleSubmit(onSubmit)}>
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
															id="inlineRadio2"
															value="1"
															onChange={() => (
																setScore(1), setIsOpen(true), setReason('')
															)}
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
															value="2"
															onChange={() => (
																setScore(2), setIsOpen(true), setReason('')
															)}
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
															value="3"
															onChange={() => (setScore(3), setReason(''))}
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
															value="4"
															onChange={() => (setScore(4), setReason(''))}
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
															value="5"
															onChange={() => (setScore(5), setReason(''))}
														/>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</form>

								<p>{reason}</p>

								<button
									className=" btn btn-primary "
									disabled={score > 0 ? false : 'disabled'}
									onClick={onSubmit}
								>
									Submit Vote
								</button>
							</div>
						</div>
					</div>
				)}
			</section>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<ReasonForm onSubmitReason={onSubmitReason} hideModal={hideModal} />
			</Modal>
		</React.Fragment>
	);
};

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'Please enter a valid title';
	}
	if (!formValues.journal) {
		errors.journal = 'Please enter a valid journal name';
	}

	if (!formValues.refID) {
		errors.refID = 'Please enter a valid refID';
	}
	if (!formValues.url) {
		errors.url = 'Please enter a valid url';
	}
	if (!formValues.abstract) {
		errors.abstract = 'Please enter your abstract';
	}
	if (!formValues.threshold || formValues.threshold === '~Select Threshold~') {
		errors.threshold = 'Please choose a threshold';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'ArticleVote',
	validate : validate
})(ArticleVote);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { addVote, deleteArticle, updateArticle })(formWrapped);
