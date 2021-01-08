import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const loadApi = async (filters) => {
	return await axios.get('/api/loads/filtered', { params: { filters } });
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchFilteredLoads(action) {
	try {
		let { data } = yield call(loadApi, action.payload);
		yield put({ type: 'FETCH_LOADS_FILTERED_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_LOADS_FILTERED_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* loadFilteredWatcher() {
	yield takeLatest('FETCH_LOADS_FILTERED_REQUEST', fetchFilteredLoads);
}

export default function* rootSaga() {
	yield all([ loadFilteredWatcher() ]);
}
