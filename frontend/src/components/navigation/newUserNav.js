import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './newUserNav.css';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';

import Logo from './logo.png';

import { login, logout } from '../../actions/auth';
import { signIn, signOut } from '../../actions/googleAuth';

const NewUserNav = (props) => {
	const { isSignedIn } = props;

	if (!isSignedIn) {
		return (
			<React.Fragment>
				<Navbar collapseOnSelect expand="lg" bg="" variant="">
					<Navbar.Brand href="/">
						<img id="logo" src={Logo} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto " />
						<Nav>
							<Nav.Link as={Link} className="" to="/" href="/">
								Home
							</Nav.Link>

							<Nav.Link as={Link} className="" to="/signup" href="/signup">
								Signup
							</Nav.Link>

							<Nav.Link
								as={Link}
								className="nav-link anchor btn btn-outline-primary"
								to="/login"
								href="/login"
							>
								Login
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</React.Fragment>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn    : state.auth.isSignedIn,
		currentUserId : state.auth.userId,
		userName      : state.auth.userName,
		userSurname   : state.auth.userSurname
	};
};

export default connect(mapStateToProps, { login, logout })(NewUserNav);
