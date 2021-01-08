import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const loadApi = async () => {
	return await axios.get('/api/loads');
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchLoads(action) {
	try {
		let { data } = yield call(loadApi);

		console.log('FetchLoads', data);
		yield put({ type: 'FETCH_LOADS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_LOADS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* loadWatcher() {
	yield takeLatest('FETCH_LOADS_REQUEST', fetchLoads);
}

export default function* rootSaga() {
	yield all([ loadWatcher() ]);
}
