import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MyLoadListItem from './myLoadListItem';
import selectLoads from '../../selectors/loads';
import axios from '../../apis/backend';
import Skeleton from '@yisheng90/react-loading';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

import queryString from 'query-string';
import { fetchMyLoads, updateMyLoad, getMyLoads } from '../../actions/myLoads';
import _ from 'lodash';
import MyLoadsListSpinner from '../spinners/myLoadsListSpinner';

const MyLoadsList = (props) => {
	const [ MyLoads, setMyLoads ] = useState([]);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ Status, setStatus ] = useState('');
	const [ error, setError ] = useState('');

	// useEffect(
	// 	() => {
	// 		let isSubscribed = true;
	// 		setIsLoading(true);

	// 		try {
	// 			axios
	// 				.get(`/api/myloads/status/${props.status}`)
	// 				.then((response) => (isSubscribed ? (setMyLoads(response.data), setIsLoading(false)) : null));
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			console.log('There was an error', error);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	},
	// 	[ props.status, MyLoads.length ]
	// );

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				props.getMyLoads(props.status);
			} catch (err) {
				setError(err);
			}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

	const onCloseLoad = (loadId) => {
		return props.updateMyLoad(loadId, { status: 'Archived' });
	};

	return (
		<section className="task-list">
			{props.loading ? (
				<MyLoadsListSpinner />
			) : (
				props.myloads.map((load) => (
					<MyLoadListItem key={load._id} {...load} onCloseLoad={onCloseLoad} status={props.status} />
				))
			)}
		</section>
	);
};

// class MyLoadsList extends React.Component {
// 	componentDidMount() {
// 		if (this.props.currentUserId) {
// 			this.props.fetchMyLoads(this.props.status);
// 		}
// 	}

// 	componentDidUpdate(prevProps) {
// 		// if (prevProps.currentUserId !== this.props.currentUserId) {
// 		// 	this.props.fetchMyLoads(this.props.status);
// 		// }

// 		if (prevProps.status !== this.props.status) {
// 			this.props.fetchMyLoads(this.props.status);
// 		}
// 	}

// 	onCloseLoad = (loadId) => {
// 		return this.props.updateMyLoad(loadId, { status: 'Archived' });
// 	};

// 	renderComponentDetails = () => {
// 		if (!this.props.myloads) {
// 			return <div>Loading</div>;
// 		}
// 		return (
// 			<section className="task-list">
// 				{this.props.myloads.map((load) => (
// 					<MyLoadListItem
// 						key={load._id}
// 						{...load}
// 						onCloseLoad={this.onCloseLoad}
// 						status={this.props.status}
// 					/>
// 				))}
// 			</section>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

//This is the standard way of creating a function that is passed to connect,
// This is the function that determines what to get fro the store and it returns an object
const mapStateToProps = (state, ownProps) => {
	const loading = state.myloads && state.myloads.loading;
	return {
		myloads       : selectLoads(_.toArray(state.myloads), state.loadsfilters),
		currentUserId : state.auth.userId,
		loading       : loading
	};
};

export default connect(mapStateToProps, { fetchMyLoads, updateMyLoad, getMyLoads })(MyLoadsList);
