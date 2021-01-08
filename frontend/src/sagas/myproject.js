import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const MyProjectApi = async () => {
	return await axios.get('/api/myprojects');
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchMyProjects(action) {
	try {
		let { data } = yield call(MyProjectApi);

		console.log('getMyProjects', data);
		yield put({ type: 'FETCH_MY_PROJECTS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_MY_PROJECTS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* myProjectWatcher() {
	yield takeLatest('FETCH_MY_PROJECTS_REQUEST', fetchMyProjects);
}

export default function* rootSaga() {
	yield all([ myProjectWatcher() ]);
}
