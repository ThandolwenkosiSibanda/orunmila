import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchLoad } from '../../actions/loads';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import { Link } from 'react-router-dom';
import LoadsReducer from '../../reducers/loadsReducer';
import _ from 'lodash';

const ArticleListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ LoadId, setLoadId ] = useState('');
	const [ expanded, setExpanded ] = React.useState(false);
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const checkIfVoted = () => {
		if (props.article.votes.length > 0) {
			let reviewers = props.article.votes.map((vote) => {
				return vote.reviewer._id;
			});
			let currentUser = [ props.currentUserId ];
			let filtered = reviewers.filter((reviewer) => currentUser.includes(reviewer));

			if (filtered.length > 0) {
				return 'Voted Already';
			} else {
				return 'Yet To Vote';
			}
		}
	};

	return (
		<React.Fragment>
			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
				<section className="task-list">
					<div className="task-block card">
						<div className="task-details">
							<p>
								<small>
									<strong>#ID:</strong> {props.article._id}
								</small>
							</p>

							<div className="task-name">{props.article.Title}</div>
							<p>
								<small>
									<strong>#Key Words:</strong> {props.article['Author Keywords']}
								</small>
							</p>

							<Accordion
								expanded={expanded === 'panel' + props.article._id}
								onChange={handleChange('panel' + props.article._id)}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<button className="btn btn-primary">
										<strong>
											{expanded && expanded === 'panel' + props.article._id ? (
												'Hide Abstract'
											) : (
												'Show Abstract'
											)}
										</strong>
									</button>
								</AccordionSummary>
								<p className="ref">
									<small>
										<strong>Ref ID: </strong> {props.article._id}
									</small>
								</p>
								<AccordionDetails>
									<div className="task-desc">{props.article.Abstract}</div>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				</section>
			</div>

			<hr />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};
export default connect(mapStateToProps, { fetchLoad, fetchCreditsTotal })(ArticleListItem);
