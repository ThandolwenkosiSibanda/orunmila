import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';

import _ from 'lodash';

const ProjectListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ LoadId, setLoadId ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			} catch (err) {}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

	const countObjectKeys = (obj) => {
		return Object.keys(obj).length;
	};

	return (
		<React.Fragment>
			{countObjectKeys(props.project) > 4 ? (
				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
					<section className="task-list">
						<Link to={`/projects/${props.project._id}`}>
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
											<strong>#Created:</strong>{' '}
											{moment(props.project.createdAt).format('DD/MM/YYYY')}
										</small>
									</p>
								</div>
							</div>
						</Link>
					</section>
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps)(ProjectListItem);
