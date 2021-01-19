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

import { fetchProject } from '../../actions/projects';

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
			props.fetchProject(props.projectId);
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				props.fetchProject(props.projectId);
			} catch (err) {
				setError(err);
			}
			return () => (isSubscribed = false);
		},
		[ props.projectId ]
	);

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
					<li className="breadcrumb-item active">My Project Name: {props.project && props.project.title}</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					{props.project &&
						props.project.articles.map((article) => (
							<React.Fragment>
								<ArticleListItem article={article} key={article._id} />
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
									<ArticleVote
										articleId={article._id}
										article={article}
										projectId={props.project._id}
										handleSubmit={() => handleSubmit}
									/>
								</div>
								<hr />
							</React.Fragment>
						))}
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<ProjectForm onSubmit={onSubmit} />
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, OwnProps) => {
	return {
		project   : state.projects[OwnProps.match.params.id],
		projectId : OwnProps.match.params.id
	};
};

export default connect(mapStateToProps, { fetchProject })(ProjectView);
