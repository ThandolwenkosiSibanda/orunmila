import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import axios from '../apis/backend';

/** function that returns an axios call */
const projectApi = async (status) => {
	console.log('project status', status);
	return await axios.get('/api/projects', { params: { status } });
};

/**
 * This is the Saga Worker that is responsible for the side effects ie getting data from the backend
 */

function* fetchProjects(action) {
	try {
		let { data } = yield call(projectApi, action.payload);

		console.log('getProjects', data);
		yield put({ type: 'FETCH_PROJECTS_SUCCESS', payload: data });
	} catch (error) {
		yield put({ type: 'FETCH_PROJECTS_FAILURE', payload: { loading: error } });
	}
}

/**
 * This is the Saga Watcher that is triggered when dispatching action of type
 */

function* projectWatcher() {
	yield takeLatest('FETCH_PROJECTS_REQUEST', fetchProjects);
}

export default function* rootSaga() {
	yield all([ projectWatcher() ]);
}
