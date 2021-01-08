import React, { Component } from 'react';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from './logo.png';

class mainNav extends Component {
	renderComponentDetails = () => {
		return (
			<div className="container-fluid">
				<nav className="navbar navbar-expand-lg custom-navbar ">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#WafiAdminNavbar"
						aria-controls="WafiAdminNavbar"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon">
							<i />
							<i />
							<i />
						</span>
					</button>
					<div className="collapse navbar-collapse" id="r">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle"
									id="dashboardsDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
									to="/loads"
								>
									<i className="icon-truck nav-icon" />
									Projects
								</Link>
								<ul className="dropdown-menu" aria-labelledby="dashboardsDropdown">
									<li>
										<Link className="dropdown-item" to="/loads">
											Assigned Projects
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/proposals">
											Archived Projects
										</Link>
									</li>
								</ul>
							</li>

							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle"
									id="appsDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
									to="/contracts"
								>
									<i className="icon-briefcase nav-icon" />
									My Projects
								</Link>
								<ul className="dropdown-menu" aria-labelledby="appsDropdown">
									<li>
										<Link className="dropdown-item" to="/contracts">
											Active Projects
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/contracts">
											Archived Projects
										</Link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentUserId : state.auth.userId,
		userName      : state.auth.userName,
		userSurname   : state.auth.userSurname
	};
};

export default connect(mapStateToProps)(mainNav);
