import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const myLoadApi = async (status) => {
	return await axios.get('/api/myloads', { params: { status } });
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchMyLoads(action) { 
	try {
		let { data } = yield call(myLoadApi, action.payload);
		yield put({ type: 'FETCH_MYLOADS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_MYLOADS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* myLoadWatcher() {
	yield takeLatest('FETCH_MYLOADS_REQUEST', fetchMyLoads);
}

export default function* rootSaga() {
	yield all([ myLoadWatcher() ]);
}
