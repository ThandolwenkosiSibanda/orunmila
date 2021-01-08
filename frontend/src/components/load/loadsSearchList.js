import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadListItem from './loadListItem';
import Pagination from '@material-ui/lab/Pagination';
import selectLoads from '../../selectors/loads';
import ViewLoadModal from './viewLoadModal';
import { fetchLoads, getLoads, getFilteredLoads } from '../../actions/loads';
import { selectLoad, clearSelectedLoad } from '../../actions/selectedLoad';
import axios from '../../apis/backend';
import Axios from 'axios';
import './loadList.css';
import _ from 'lodash';
import LoadListSpinner from '../spinners/loadListSpinner';
const loadsPerPage = 3;
let arrayForHoldingLoads = [];

const LoadsSearchList = (props) => {
	const [ loads, setLoads ] = useState([]);
	const [ itemsOnDisplay, setItemsOnDisplay ] = useState(5);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ searchTerms, setSearchTerms ] = useState('');
	const [ error, setError ] = useState('');

	const [ totalLoads, setTotalLoads ] = useState(0);
	const [ loadsToShow, setLoadsToShow ] = useState([]);
	const [ next, setNext ] = useState(loadsPerPage);

	const [ page, setPage ] = useState(1);
	const [ count, setCount ] = useState(0);
	const [ pageSize, setPageSize ] = useState(3);
	const [ start, setStart ] = useState(0);
	const [ end, setEnd ] = useState(loadsPerPage);

	const loopWithSlice = (start, end) => {
		setTotalLoads(_.size(props.loads));
		const slicedLoads = props.loads.slice(start, end);
		arrayForHoldingLoads = [ ...slicedLoads ];
		setLoadsToShow(arrayForHoldingLoads);
	};

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				props.getFilteredLoads();
				setTotalLoads(_.size(props.loads));
				setCount(Math.ceil(_.size(props.loads) / loadsPerPage));
			} catch (err) {
				setError(err);
			}
			return () => (isSubscribed = false);
		},
		[ props.loadFilters ]
	);

	useEffect(
		() => {
			loopWithSlice(0, loadsPerPage);
			setTotalLoads(_.size(props.loads));
			setCount(Math.ceil(_.size(props.loads) / loadsPerPage));
		},
		[ props.loads ]
	);

	const handlePageChange = (e, value) => {
		setPage(value);
		const offset = (value - 1) * loadsPerPage;
		loopWithSlice(offset, offset + loadsPerPage);
		setNext(next + loadsPerPage);
	};

	return (
		<React.Fragment>
			<div className="row gutters">
				{props.loading == 'Error' ? (
					<div>Error: Please check your network connection and refresh the page</div>
				) : props.loading === true ? (
					<LoadListSpinner />
				) : (
					loadsToShow.map((load) => <LoadListItem key={load._id} load={load} />)
				)}
			</div>

			<Pagination
				count={count}
				page={page}
				siblingCount={1}
				boundaryCount={1}
				variant="outlined"
				shape="rounded"
				onChange={handlePageChange}
			/>
		</React.Fragment>
	);
};

//This is the standard way of creating a function that is passed to connect,
// This is the function that determines what to get fro the store and it returns an object
/**
 * 
 * @param {*} state 
 * Ensure you use _toArray to convert the objects to an array
 * Spent the whole day getting this wrong
 */
const mapStateToProps = (state) => {
	const loading = state.loadsFiltered && state.loadsFiltered.loading;

	return {
		// loads         : selectLoads(_.toArray(state.loads), state.loadsfilters),
		loads         : selectLoads(_.toArray(state.loadsFiltered), state.loadsfilters),
		currentUserId : state.auth.userId,
		selectedLoad  : state.selectedLoad,
		loading       : loading,
		loadFilters   : state.loadsfilters
	};
};

export default connect(mapStateToProps, { fetchLoads, getLoads, getFilteredLoads, selectLoad, clearSelectedLoad })(
	LoadsSearchList
);
