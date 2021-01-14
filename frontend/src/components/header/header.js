import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import history from '../../history';
import AppRouter from '../../routers/appRouter';
import Notification from '../notification/notification';
import './header.css';

import { Router, Route, Switch, Link, useRouteMatch, useParams } from 'react-router';
// import MainNav from '../../components/navigation/mainNav';
import MainNav from '../../components/navigation/nav';
import TopNav from '../../components/navigation/topNav';
class Header extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router history={history}>
					<header className="headerr">
						<div className="logo-wrapper">
							<a href="/" className="logo">
								<img src="" alt="" />
							</a>
						</div>

						<TopNav />
					</header>

					<MainNav />

					<AppRouter />
				</Router>
			</React.Fragment>
		);
	}
}

export default Header;
