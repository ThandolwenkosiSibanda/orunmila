import { all } from 'redux-saga/effects';

import projectWatcher from './project';
import myProjectWatcher from './myproject';
import articleWatcher from './article';

export default function* rootSaga() {
	yield all([ projectWatcher(), myProjectWatcher(), articleWatcher() ]);
}
