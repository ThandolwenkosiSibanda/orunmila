import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import rootSaga from './sagas';

//Store
import configureStore from './store/configureStore';
//Components
import Index from './components/index';
// Action Creators

//Styles - CSS and SCSS
import './styles/bootstrap.min.scss';
import './styles/main.scss';
import './styles/main-light-color.scss';

//Configure The Store/
const store = configureStore();

//Wrap the main App or the root app with a provider.
// 1. The provider passes the store to all the components in the application.
// 2. You can then assess the store in any component by wrapping the particular component with a (connect) from the react redux library

ReactDOM.render(
	<Provider store={store}>
		<Index />
	</Provider>,
	document.getElementById('root')
);
