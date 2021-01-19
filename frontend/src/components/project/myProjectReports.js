import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchProject } from '../../actions/projects';
import { downloadReport } from '../../actions/reports';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ProjectForm from './projectForm';

import './projectsDashboard.css';
import ArticleVoteAnalysis from './articleVoteAnalysis';

const MyProjectReports = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const useStyles = makeStyles((theme) => ({}));
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ error, setError ] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.fetchProject(props.project._id);
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

	const queryString = () => {
		let values = queryString.parse(props.queryString);

		if (values.status === undefined || values.status === null) {
			return 'current';
		}
		return values.status;
	};

	const downloadReport = () => {
		let project = props.project;
		props.downloadReport(project);
	};

	return (
		<React.Fragment>
			<PictureAsPdfIcon onClick={downloadReport} />
			<Modal show={IsOpen} onHide={hideModal} size="lg">
				Open Semame
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, OwnProps) => {
	return {
		articles : _.toArray(state.articles)
	};
};

export default connect(mapStateToProps, { downloadReport })(MyProjectReports);
