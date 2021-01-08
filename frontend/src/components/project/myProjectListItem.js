import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { fetchLoad } from '../../actions/loads';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import _ from 'lodash';
import ReviewersDashboard from './reviewersDashboard';

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

	return (
		<React.Fragment>
			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
				<section className="task-list">
					<Link to={`/myprojects/${props.project._id}`}>
						<div className="task-block card">
							<div className="task-details">
								<p>
									<small>
										<strong>#ID:</strong> {props.project._id}
									</small>
								</p>

								<div className="task-name"> {props.project.title}</div>
								<p>
									<small>
										<strong>#Created:</strong> {moment(props.project.createdAt).fromNow()}
									</small>
								</p>
							</div>
						</div>
					</Link>
				</section>
			</div>

			<ReviewersDashboard project={props.project} />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { fetchLoad, fetchCreditsTotal })(MyProjectListItem);
