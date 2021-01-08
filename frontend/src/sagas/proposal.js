import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const proposalApi = async () => {
	return await axios.get('/api/myproposals/');
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchProposals(action) {
	try {
		let { data } = yield call(proposalApi);
		yield put({ type: 'FETCH_PROPOSALS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_PROPOSALS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* proposalWatcher() {
	yield takeLatest('FETCH_PROPOSALS_REQUEST', fetchProposals);
}

export default function* rootSaga() {
	yield all([ proposalWatcher() ]);
}
