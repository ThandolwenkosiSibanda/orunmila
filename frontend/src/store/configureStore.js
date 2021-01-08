import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import compose from 'lodash/fp/compose';
import rootSaga from '../sagas';

export default () => {
	const sagaMiddleware = createSagaMiddleware();
	// Configure the store to work with middleware while also showing the React Developer tools
	const composeEnhancers =
		typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
					{
						// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
					}
				)
			: compose;

	const middlewares = [ thunk, sagaMiddleware ];

	const enhancer = composeEnhancers(
		applyMiddleware(...middlewares)
		// other store enhancers if any
	);
	// Create The Store and pass in the Reducers
	const store = createStore(rootReducer, enhancer);
	sagaMiddleware.run(rootSaga);
	return store;
};
