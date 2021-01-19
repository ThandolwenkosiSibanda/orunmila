import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './authReducer';
import UsersReducer from './usersReducer';
import ProjectsReducer from './projectsReducer';
import MyProjectsReducer from './myProjectsReducer';
import ArticlesReducer from './articlesReducer';

//Combine Reducers
//1. We 'Combine' our reducers here so that we can export them to the other files from one central location.
//2. Instead of exporting our reducers one by one we just call the index file.

const rootReducer = combineReducers({
	auth       : AuthReducer,
	form       : formReducer,
	user       : UsersReducer,
	projects   : ProjectsReducer,
	myprojects : MyProjectsReducer,
	articles   : ArticlesReducer
});

export default rootReducer;
