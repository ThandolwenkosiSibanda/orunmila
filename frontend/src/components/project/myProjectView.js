import React, { Component, useState, useEffect } from 'react';
import selectLoads from '../../selectors/loads';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Pagination from '@material-ui/lab/Pagination';
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

import { getArticles } from '../../actions/articles';
import { fetchMyProject } from '../../actions/myprojects';

import ProjectForm from './projectForm';
import ArticleVote from './articleVote';
import MyArticleListItem from './myArticleListItem';
import './projectsDashboard.css';
import ArticleVoteAnalysis from './articleVoteAnalysis';
import MyArticlePagination from './myArticlePagination';

//Items for pagination
const articlesPerPage = 10;

const MyProjectView = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ error, setError ] = useState('');
	//Items for pagination
	const [ page, setPage ] = useState(1);
	const [ start, setStart ] = useState(0);
	const [ end, setEnd ] = useState(articlesPerPage);
	const [ count, setCount ] = useState(0);
	const [ next, setNext ] = useState(articlesPerPage);

	useEffect(() => {
		let isSubscribed = true;

		try {
			
			props.fetchMyProject(props.projectId);
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	useEffect(
		() => {
			let isSubscribed = true;
			try {
			
				props.fetchMyProject(props.projectId);
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

	const handlePageChange = (currentPage) => {
		setPage(currentPage);
	};

	const handleSubmit = (formValues) => {
		
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
								<MyArticleListItem article={article} key={article._id} />
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
									<ArticleVoteAnalysis
										articleId={article._id}
										article={article}
										projectId={props.projectId}
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
		project   : state.myprojects[OwnProps.match.params.id],
		projectId : OwnProps.match.params.id
	};
};

export default connect(mapStateToProps, { getArticles, fetchMyProject })(MyProjectView);
