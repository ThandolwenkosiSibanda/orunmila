import { all } from 'redux-saga/effects';
import loadsWatcher from './loads.js';
import proposalsWatcher from './proposal';
import loadsFilteredWatcher from './loadsFiltered';
import creditsWatcher from './credits';
import offersWatcher from './offers';
import myLoadWatcher from './myloads';
import contractWatcher from './contracts';
import projectWatcher from './project';
import myProjectWatcher from './myproject';
import articleWatcher from './article';

export default function* rootSaga() {
	yield all([
		loadsWatcher(),
		projectWatcher(),
		myProjectWatcher(),
		articleWatcher(),
		loadsFilteredWatcher(),
		proposalsWatcher(),
		creditsWatcher(),
		offersWatcher(),
		myLoadWatcher(),
		contractWatcher()
	]);
}
