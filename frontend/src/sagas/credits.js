import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const creditsApi = async () => {
	return await axios.get('/api/credits');
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchCredits(action) {
	try {
		let { data } = yield call(creditsApi);
		yield put({ type: 'FETCH_CREDITS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_CREDITS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* creditWatcher() {
	yield takeLatest('FETCH_CREDITS_REQUEST', fetchCredits);
}

export default function* rootSaga() {
	yield all([ creditWatcher() ]);
}
