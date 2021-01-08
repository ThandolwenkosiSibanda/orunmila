import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadListItem from './loadListItem';
import selectLoads from '../../selectors/loads';
import ViewLoadModal from './viewLoadModal';
import { fetchLoads, getLoads } from '../../actions/loads';
import { selectLoad, clearSelectedLoad } from '../../actions/selectedLoad';
import axios from '../../apis/backend';
import Axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import './loadList.css';
import _ from 'lodash';
import LoadListSpinner from '../spinners/loadListSpinner';
const loadsPerPage = 3;
let arrayForHoldingLoads = [];

const LoadsList = (props) => {
	const [ loads, setLoads ] = useState([]);
	const [ itemsOnDisplay, setItemsOnDisplay ] = useState(5);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ searchTerms, setSearchTerms ] = useState('');
	const [ error, setError ] = useState('');

	const [ totalLoads, setTotalLoads ] = useState(0);
	const [ loadsToShow, setLoadsToShow ] = useState([]);
	const [ next, setNext ] = useState(loadsPerPage);

	const loopWithSlice = (start, end) => {
		setTotalLoads(_.size(props.loads));
		const slicedLoads = props.loads.slice(start, end);
		arrayForHoldingLoads = [ ...loadsToShow, ...slicedLoads ];

		/**
		 * Using the Uniq function
		 * The sliced loads and loads where giving duplicates when loaded from another reroute
		 */

		let uniq = _.uniqBy(arrayForHoldingLoads, function(o) {
			return o._id;
		});

		setLoadsToShow(uniq);
	};

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.getLoads();
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	useEffect(
		() => {
			loopWithSlice(0, loadsPerPage);
		},
		[ props.loads ]
	);

	const handleShowMoreLoads = () => {
		loopWithSlice(next, next + loadsPerPage);
		setNext(next + loadsPerPage);
	};

	return (
		<React.Fragment>
			<div className="row gutters">
				{props.loading == 'Error' ? (
					<div>Error: Please check your network connection and refresh the page</div>
				) : props.loading === true ? (
					<React.Fragment>
						<LoadListSpinner />
					
					</React.Fragment>
				) : (
					loadsToShow.map((load) => <LoadListItem key={load._id} load={load} />)
				)}
			</div>

			{totalLoads > loadsPerPage && totalLoads > next ? (
				<div className="col-sm-12">
					<button className="btn-loadmore" onClick={handleShowMoreLoads}>
						Load More....
					</button>
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
};

// class LoadsList extends React.Component {
// 	async componentDidMount() {
// 		await this.props.fetchLoads();
// 	}

// 	renderComponentDetails = () => {
// 		if (!this.props) {
// 			return <div>Loading..</div>;
// 		}

// 		return (
// 			<React.Fragment>
// 				<div className="row gutters">
// 					{this.props.loads.map((load) => (
// 						<LoadListItem key={load._id} load = {load} />
// 					))}
// 				</div>
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

//This is the standard way of creating a function that is passed to connect,
// This is the function that determines what to get fro the store and it returns an object
/**
 * 
 * @param {*} state 
 * Ensure you use _toArray to convert the objects to an array
 * Spent the whole day getting this wrong
 */
const mapStateToProps = (state) => {
	const loading = state.loads && state.loads.loading;
	return {
		loads         : selectLoads(_.toArray(state.loads), state.loadsfilters),
		// loads         : _.toArray(state.loads),
		currentUserId : state.auth.userId,
		selectedLoad  : state.selectedLoad,
		loading       : loading
	};
};

export default connect(mapStateToProps, { fetchLoads, getLoads, selectLoad, clearSelectedLoad })(LoadsList);
