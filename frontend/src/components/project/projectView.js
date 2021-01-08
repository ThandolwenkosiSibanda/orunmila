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
import LoadListSpinner from '../spinners/loadListSpinner';

import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';

import { getProject } from '../../actions/projects';
import { addReview } from '../../actions/reviews';
import ProjectForm from './projectForm';
import ArticleVote from './articleVote';
import ArticleListItem from './articleListItem';
import './projectsDashboard.css';

const ProjectView = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ error, setError ] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.getProject(props.projectId.id);
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

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

	const handleSubmit = (formValues) => {
		console.log('yesz');
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
					<li className="breadcrumb-item active">
						Project Name: {props.articles.length > 1 ? props.articles[0].project.title : ''}
					</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					{props.articles[0] === 'Error' ? (
						<div>Error: Please check your network connection and refresh the page</div>
					) : props.articles[0] === true ? (
						<React.Fragment>
							<LoadListSpinner />
						</React.Fragment>
					) : (
						props.articles.map((article) => (
							<React.Fragment>
								<ArticleListItem article={article} />
								<div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
									<ArticleVote
										articleId={article._id}
										article={article}
										projectId={props.articles.length > 1 ? props.articles[0].project._id : ''}
										handleSubmit={() => handleSubmit}
									/>
								</div>
								<hr />
							</React.Fragment>
						))
					)}
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<ProjectForm onSubmit={onSubmit} />
			</Modal>
		</React.Fragment>
	);
};

// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		isSignedIn  : state.auth.isSignedIn,
// 		queryString : ownProps.location.search
// 	};
// };

const mapStateToProps = (state, OwnProps) => {
	return {
		project   : state.projects[OwnProps.match.params.id],
		projectId : OwnProps.match.params,
		articles  : _.toArray(state.articles)
	};
};

export default connect(mapStateToProps, { getProject, addReview })(ProjectView);
