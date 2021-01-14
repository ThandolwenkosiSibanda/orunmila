import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import './nav.css';

import React, { Component } from 'react';
import Logo from './logo.png';

export default class nav extends Component {
	render() {
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
							<NavDropdown title="Assigned Projects" id="collasible-nav-dropdown">
								<Nav.Link
									as={Link}
									className="dropdown-item"
									to="/projects/?status=active"
									href="/projects/?status=active"
								>
									Active Projects
								</Nav.Link>
								<NavDropdown.Divider />
								<Nav.Link
									as={Link}
									className="dropdown-item"
									to="/projects/?status=archived"
									href="/projects/?status=archived"
								>
									Archived Projects
								</Nav.Link>
							</NavDropdown>

							<NavDropdown title="My Projects" id="collasible-nav-dropdown">
								<Nav.Link
									as={Link}
									className="dropdown-item"
									to="/myprojects/?status=active"
									href="/myprojects"
								>
									Active Projects
								</Nav.Link>
								<Nav.Link
									as={Link}
									className="dropdown-item"
									to="/myprojects/?status=archived"
									href="/mprojects"
								>
									Archived Projects
								</Nav.Link>
								<NavDropdown.Divider />
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</React.Fragment>
		);
	}
}
