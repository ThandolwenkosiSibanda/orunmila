import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const contractApi = async (status) => {
	return await axios.get('/api/contracts', { params: { status } });
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchContracts(action) {
	try {
		let { data } = yield call(contractApi, action.payload);

		yield put({ type: 'FETCH_CONTRACTS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_CONTRACTS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* contractWatcher() {
	yield takeLatest('FETCH_CONTRACTS_REQUEST', fetchContracts);
}

export default function* rootSaga() {
	yield all([ contractWatcher() ]);
}
