import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const articleApi = async ({ projectId, currentPage }) => {
	

	
	return await axios.get(`/api/articles/${projectId}`, { params: { currentPage } });
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchArticles(action) {
	try {
		let { data } = yield call(articleApi, action.payload);

		yield put({ type: 'FETCH_ARTICLES_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_ARTICLES_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* articleWatcher() {
	yield takeLatest('FETCH_ARTICLES_REQUEST', fetchArticles);
}

export default function* rootSaga() {
	yield all([ articleWatcher() ]);
}
