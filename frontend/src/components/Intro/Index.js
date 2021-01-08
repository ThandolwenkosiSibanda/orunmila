import React, { Component, useState, useEffect } from 'react';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import { addSupportMessage } from '../../actions/supportMessages';
import Modal from 'react-bootstrap/Modal';
import './index.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import jobpost from './jobpost.svg';
import trucker from './trucker.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContactSupportModal from './contactSupportModal';
import FlashMessage from '../flash/index';

const IntroPage = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);

	const showModal = (e) => {
		e.preventDefault();
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	const useStyles = makeStyles((theme) => ({
		root             : {
			width           : '100%',
			backgroundColor : 'white',
			paddingBottom   : '30px'
		},
		heading          : {
			fontSize   : theme.typography.pxToRem(15),
			flexBasis  : '33.33%',
			flexShrink : 0
		},
		secondaryHeading : {
			fontSize : theme.typography.pxToRem(15),
			color    : theme.palette.text.secondary
		}
	}));

	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const onSubmit = (formValues) => {
		hideModal();

		props.addSupportMessage(formValues);
	};

	useEffect(
		() => {
			const hash = props.history.location.hash;
			if (hash && document.getElementById(hash.substr(1))) {
				// Check if there is a hash and if an element with that id exists
				document.getElementById(hash.substr(1)).scrollIntoView({ behavior: 'smooth' });
			}
		},
		[ props.history.location.hash ]
	);

	return (
		<React.Fragment>
			<FlashMessage />
			<div className="slider-container">
				<h3 className="heading">Kratos</h3>
			</div>
			<div className="scope pb-5">
				<div className="container">
					<div className="row">
						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 ">
							<div className="" />
						</div>
						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 types">
							<div className="">
								<p className="underline" />

								<p />
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	let creditsTotal = _.toArray(state.creditsTotal)[0] ? _.toArray(state.creditsTotal)[0].total : 0;
	return {
		isSignedIn   : state.auth.isSignedIn,
		creditsTotal : creditsTotal
	};
};

export default connect(mapStateToProps, { fetchCreditsTotal, addSupportMessage })(IntroPage);
