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

import { getMyProjects } from '../../actions/myprojects';
import { addProject } from '../../actions/projects';
import ProjectForm from './projectForm';
import LoadListSpinner from '../spinners/loadListSpinner';
import MyProjectListItem from './myProjectListItem';
import './projectsDashboard.css';

const MyProjectsList = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ Status, setStatus ] = useState('');
	const [ error, setError ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				props.getMyProjects(props.status);
			} catch (err) {
				setError(err);
			}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

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

	const capitalise = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const renderComponentDetails = () => {
		if (props.projects.length < 1) return <div>You do not currently have any {props.status} projects</div>;
		return (
			<React.Fragment>
				{props.projects[0] === 'Error' ? (
					<React.Fragment>
						<LoadListSpinner />
					</React.Fragment>
				) : props.projects[0] === true ? (
					<React.Fragment>
						<LoadListSpinner />
					</React.Fragment>
				) : (
					props.projects.map((project) => (
						<React.Fragment key={project._id}>
							<MyProjectListItem key={project._id} project={project} status={props.status} />
						</React.Fragment>
					))
				)}
			</React.Fragment>
		);
	};

	return renderComponentDetails();
};

const mapStateToProps = (state, ownProps) => {
	return {
		projects   : _.toArray(state.myprojects),
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { getMyProjects, addProject })(MyProjectsList);
