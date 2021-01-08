import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ChatroomsReducer from './chatroomsReducer';
import ContractsReducer from './contractsReducer';
import CreditsReducer from './creditsReducer';
import CreditsTotalReducer from './creditsTotalReducer';
import AuthReducer from './authReducer';
import LoadsFiltersReducer from './loadsFiltersReducer';
import LoadsReducer from './loadsReducer';
import LoadsFilteredReducer from './loadsFilteredReducer';
import ProposalsReducer from './proposalsReducer';
import SelectedLoadReducer from './selectedLoadReducer';
import MessagesReducer from './messagesReducer';
import MyLoadsReducer from './myLoadsReducer';
import OffersReducer from './offersReducer';
import UsersReducer from './usersReducer';
import OnlineUsersReducer from './onlineUsersReducer';
import SocketsReducer from './socketsReducer';
import FlashMessagesReducer from './flashMessageReducer';
import ProjectsReducer from './projectsReducer';
import MyProjectsReducer from './myProjectsReducer';
import ArticlesReducer from './articlesReducer';

//Combine Reducers
//1. We 'Combine' our reducers here so that we can export them to the other files from one central location.
//2. Instead of exporting our reducers one by one we just call the index file.

const rootReducer = combineReducers({
	auth          : AuthReducer,
	chatrooms     : ChatroomsReducer,
	contracts     : ContractsReducer,
	credits       : CreditsReducer,
	creditsTotal  : CreditsTotalReducer,
	form          : formReducer,
	loadsfilters  : LoadsFiltersReducer,
	loads         : LoadsReducer,
	loadsFiltered : LoadsFilteredReducer,
	messages      : MessagesReducer,
	myloads       : MyLoadsReducer,
	offers        : OffersReducer,
	proposals     : ProposalsReducer,
	selectedLoad  : SelectedLoadReducer,
	user          : UsersReducer,
	onlineUsers   : OnlineUsersReducer,
	sockets       : SocketsReducer,
	flashMessage  : FlashMessagesReducer,
	projects      : ProjectsReducer,
	myprojects    : MyProjectsReducer,
	articles      : ArticlesReducer
});

export default rootReducer;
