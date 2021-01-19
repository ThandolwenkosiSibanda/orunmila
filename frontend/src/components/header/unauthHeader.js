import React, { Component } from 'react';

import history from '../../history';
import AppRouter from '../../routers/appRouter';

import './unauthHeader.css';

import { Router } from 'react-router';

import NewUserNav from '../../components/navigation/newUserNav';
class UnAuthHeader extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router history={history}>
					<header className="header-light">
						<div className="logo-wrapper">
							<a href="/" className="logo">
								<img src="" alt="" />
							</a>
						</div>
					</header>

					<NewUserNav />

					<AppRouter />
				</Router>
			</React.Fragment>
		);
	}
}

export default UnAuthHeader;
