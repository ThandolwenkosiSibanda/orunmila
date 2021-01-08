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
			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div className="">
					<div className="card-body">
						<ul className="nav justify-content-end">
							<li>
								<Nav.Link as={Link} className="nav-link anchor" to="/" href="/">
									Home
								</Nav.Link>
							</li>

							<li>
								<Nav.Link
									as={Link}
									className="nav-link anchor"
									to="/#how-it-works"
									href="/#how-it-works"
								>
									How It Works
								</Nav.Link>
							</li>

							<li>
								<Nav.Link as={Link} className="nav-link anchor" to="/signup" href="/signup">
									Signup
								</Nav.Link>
							</li>

							<li>
								<Nav.Link
									as={Link}
									className="nav-link anchor btn btn-outline-primary"
									to="/login"
									href="/login"
								>
									Login
								</Nav.Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn        : state.auth.isSignedIn,
		currentUserId     : state.auth.userId,
		userName          : state.auth.userName,
		userSurname       : state.auth.userSurname,
		currentUserAvatar : state.auth.userAvatar
	};
};

export default connect(mapStateToProps, { login, logout })(NewUserNav);
