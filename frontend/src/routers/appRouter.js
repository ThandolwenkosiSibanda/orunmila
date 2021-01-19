import React, { Component } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import IntroPage from '../components/Intro/Index';
import RequireAuth from './requireAuth';
import RequireUnAuth from './requireUnauth';
import Login from '../components/authentication/login';
import Signup from '../components/authentication/signup';
import ProjectsDashboard from '../components/project/projectsDashboard';
import ProjectView from '../components/project/projectView';
import MyProjectsDashboard from '../components/project/myProjectsDashboard';
import MyProjectView from '../components/project/myProjectView';

class AppRouter extends Component {
	NotFoundPage = () => <h2>Page Not Found</h2>;

	renderComponentDetails = () => {
		return (
			<Switch>
				<Route path="/" component={IntroPage} exact={true} />
				<Route path="/signup" component={RequireUnAuth(Signup)} exact={true} />
				<Route path="/login" component={RequireUnAuth(Login)} exact={true} />
				<Route path="/projects" component={RequireAuth(ProjectsDashboard)} exact={true} />
				<Route path="/projects/:id" component={RequireAuth(ProjectView)} exact={true} />
				<Route path="/myprojects" component={RequireAuth(MyProjectsDashboard)} exact={true} />
				<Route path="/myprojects/:id" component={RequireAuth(MyProjectView)} exact={true} />
				<Route component={this.NotFoundPage} />
			</Switch>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToprops = (state) => {
	return {
		currentUserId : state.auth.userId,
		isSignedIn    : state.auth.isSignedIn
	};
};

export default connect(mapStateToprops)(AppRouter);
