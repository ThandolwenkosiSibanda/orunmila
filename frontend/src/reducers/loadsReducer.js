import { ADD_LOAD, DELETE_LOAD, UPDATE_LOAD, FETCH_LOAD, FETCH_LOADS } from './types.js';
import _ from 'lodash';
// Reducers
//  ================================================================================================================================================
//   Note * Reducers are called by Dispatchers eg store.dispatch(getAllLoads());
// ================================================================================================================================================
// 1. Reducers are like the departments in a company.
//    a) We give reducers information that they control from the state eg (Loads)
//    b) We also give the reducers the ACTION..which is basically an object with the instructions of what to do..eg (ADD_LOAD).
//    c) The reducers then determine if the action that they are being given is relevant to them by checking the ACTION type property
//    d) If the action type property is not relevant to the particular reducer, the state is just returned un-modified.
//    e) If the action type is relevant then the state is 'modified'
// 2. Reducers are pure functions..ie GIGO...they can not manipulate or be manipulated by objects outside their scope.
// 3. Never change state or action. For the state always return a new object, that is why we leverage the power of ES6
//    a) ES6 spread  return [...state, action.payload] for adding a new object to an existing object
//    b) ES6 Map     return state.map((load) => { } )  for looping over an array of objects and finding one which meets a certain condition
//    c) ES6 Filter  return state.filter(({ id }) => { return id === action.id; });

const LoadsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_LOAD:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_LOAD:
			return _.omit(state, action.payload);
		case FETCH_LOAD:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_LOADS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_LOAD:
			return { ...state, [action.payload._id]: action.payload };
		case 'FETCH_LOADS_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_LOADS_SUCCESS':
			let copy = Object.assign({}, state);
			delete copy.loading;
			return { ...copy, ..._.mapKeys(action.payload, '_id') };
		case 'FETCH_LOADS_FAILURE':
			return { ...state, loading: 'Error' };
		default:
			return state;
	}
};

export default LoadsReducer;
