import React, { Component, useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import './index.css';
import { connect } from 'react-redux';
import _ from 'lodash';

import o from './o.png';

import { makeStyles } from '@material-ui/core/styles';

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
			<div className="slider-container">
				<h3 className="heading">Orunmila</h3>

				<p className="tagline">
					Get proven results <br />from the comfort of your home.
				</p>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, )(IntroPage);
