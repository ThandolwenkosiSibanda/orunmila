import React, { Component } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import IntroPage from '../components/Intro/Index';
import RequireAuth from './requireAuth';
import RequireUnAuth from './requireUnauth';

import RequireAdmin from './requireAdmin';
import RequireVerification from './requireVerification';
import LoadsDashboardPage from '../components/load/loadsDashboardPage';
import AddLoadPage from '../components/load/addLoadPage';
import EditLoadPage from '../components/load/editLoadPage';
import DeleteLoadPage from '../components/load/deleteLoadPage';
import ViewLoadPage from '../components/load/viewLoadPage';
import MyLoadsDashboardPage from '../components/load/myLoadsDashboardPage';
import ViewMyLoadPage from '../components/load/viewMyLoadPage';
import MyLoadProposalView from '../components/load/myLoadProposalView';
import ProposalsDashboardPage from '../components/proposal/proposalsDashboardPage';
import ProposalView from '../components/proposal/proposalView';
import AddProposalPage from '../components/proposal/addProposalPage';
import CreditsDashboardPage from '../components/credit/creditsDashboardPage';
import AddCreditsPage from '../components/credit/addCreditsPage';
import ChatroomsDashboardPage from '../components/chatroom/chatroomsDashboardPage';
import Chatroom from '../components/chatroom/chatroomPage';
import OffersDashboardPage from '../components/offer/offersDashboardPage';
import ReportDashboardPage from '../components/report/reportsDashboardPage';
import ContractsDashboardPage from '../components/contract/contractsDashboardPage';
import UserDashboardPage from '../components/user/userDashboard';
import Login from '../components/authentication/login';
import LoadsSearchDashboard from '../components/load/loadsSearchDashboard';
import AdminUsersDashboard from '../components/user/adminUsersDashboard';
import AdminDashboard from '../components/user/adminDashboard';
import AdminUsersView from '../components/user/adminUserView';
import Signup from '../components/authentication/signup';
import ReviewsDashboard from '../components/reviews/reviewsDashboard';
import MyReviewsDashboard from '../components/reviews/myReviewsDashboard';
import AddReview from '../components/reviews/addReview';

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
		currentUserId      : state.auth.userId,
		isSignedIn         : state.auth.isSignedIn,
		verificationStatus : state.auth.verificationStatus
	};
};

export default connect(mapStateToprops)(AppRouter);
