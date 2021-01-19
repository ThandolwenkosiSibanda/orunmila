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

//Items for pagination
const articlesPerPage = 10;

const MyArticlePagination = (props) => {
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

	const handlePageChange = (e, currentPage) => {
		setPage(currentPage);
		const offset = (currentPage - 1) * articlesPerPage;
		setNext(next + articlesPerPage);
		props.handlePageChange(currentPage);
	};

	return (
		<React.Fragment>
			<Pagination
				count={props.count}
				page={page}
				siblingCount={1}
				boundaryCount={1}
				variant="outlined"
				shape="rounded"
				onChange={handlePageChange}
			/>
		</React.Fragment>
	);
};

const mapStateToProps = (state, OwnProps) => {
	return {
		articles : _.toArray(state.articles)
	};
};

export default connect(mapStateToProps, { getArticles, fetchMyProject })(MyArticlePagination);
