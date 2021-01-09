import React, { Component, useState, useEffect } from 'react';
import selectLoads from '../../selectors/loads';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import Pagination from '@material-ui/lab/Pagination';
import queryStringParser from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';

import { getProjects } from '../../actions/projects';
import { addProject } from '../../actions/projects';
import ProjectForm from './projectForm';
import LoadListSpinner from '../spinners/loadListSpinner';
import ProjectListItem from './projectListItem';
import ProjectsList from './projectsList';
import './projectsDashboard.css';

const ProjectsDashboard = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ Status, setStatus ] = useState('');
	const [ error, setError ] = useState('');

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};
	const onSubmit = (formValues, csv) => {
		setIsOpen(false);
		props.addProject(formValues, csv);
	};

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const renderCreateLoad = () => {
		if (props.isSignedIn) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={showModal}>
							Post A New Load
						</button>
					</div>
				</div>
			);
		}
	};
	const queryString = () => {
		let values = queryStringParser.parse(props.queryString);

		if (values.status === undefined || values.status === null) {
			return 'active';
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
					<li className="breadcrumb-item active">{capitalise(queryString())} Assigned Projects</li>
				</ol>
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={showModal}>
							Create A New Project
						</button>
					</div>
				</div>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<ProjectsList status={queryString()} />
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal} size="lg">
				<ProjectForm onSubmit={onSubmit} />
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn  : state.auth.isSignedIn,
		queryString : ownProps.location && ownProps.location.search
	};
};

export default connect(mapStateToProps, { getProjects, addProject })(ProjectsDashboard);
