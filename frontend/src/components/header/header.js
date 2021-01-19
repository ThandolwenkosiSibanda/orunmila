import React, { Component } from 'react';
import history from '../../history';
import AppRouter from '../../routers/appRouter';

import './header.css';

import { Router } from 'react-router';
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
