import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const offerApi = async () => {
	return await axios.get('/api/offers');
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchOffers(action) {
	try {
		let { data } = yield call(offerApi);
		yield put({ type: 'FETCH_OFFERS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_OFFERS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* offerWatcher() {
	yield takeLatest('FETCH_OFFERS_REQUEST', fetchOffers);
}

export default function* rootSaga() {
	yield all([ offerWatcher() ]);
}
