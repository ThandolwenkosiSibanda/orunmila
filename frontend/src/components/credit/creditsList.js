import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCredits, getCredits } from '../../actions/credits';
import axios from '../../apis/backend';
import CreditsListItem from './creditsListItem';
import CreditListSpinner from '../spinners/creditListSpinner';

const CreditsList = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ loadId, setLoadId ] = useState('');
	const [ credits, setCredits ] = useState([]);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState('');

	// useEffect(
	// 	() => {
	// 		let isSubscribed = true;
	// 		setIsLoading(true);
	// 		try {
	// 			axios
	// 				.get(`/api/credits`)
	// 				.then((response) => (isSubscribed ? (setCredits(response.data), setIsLoading(false)) : null));
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			console.log('There was an error', error);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	},
	// 	[ credits.length ]
	// );

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.getCredits();
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	const showModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;
		setIsOpen(true);
		setLoadId(id);
	};

	const hideModal = () => {
		setIsOpen(false);
		setLoadId('');
	};

	const renderList = () => {
		return props.credits.map((credits) => <CreditsListItem key={credits._id} {...credits} />);
	};

	return (
		<React.Fragment>
			{props.loading ? (
				<CreditListSpinner />
			) : (
				<div className="tasks-custom">
					<div className="">
						<div className="row">
							<div className="col-sm-12">
								<div className="table-md table-responsive-sm">
									<table className="table">
										<thead>
											<tr>
												<th>Date</th>
												<th>Payment / Usage Reference</th>
												<th>Origin</th>
												<th>Amount</th>
												<th>Value</th>
											</tr>
										</thead>
										<tbody>{renderList()}</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

// class CreditsList extends Component {
// 	constructor(props) {
// 		super(props);
// 		// ({ dispatch, id, from, to, estimatedWeight, estimatedBudget, description })
// 		this.state = {
// 			IsOpen : false,
// 			loadId : ''
// 		};
// 	}

// 	componentDidMount() {
// 		if (this.props.currentUserId) {
// 			this.props.fetchCredits();
// 		}
// 	}
// 	// componentDidUpdate(prevProps) {
// 	// 	// console.log(prevProps.creditsTotal);
// 	// 	// console.log(this.props.creditsTotal);
// 	// 	// if (prevProps.creditsTotal !== this.props.creditsTotal) {
// 	// 	// 	this.props.fetchCreditsTotal();
// 	// 	// }
// 	// 	// this.props.fetchCredits();
// 	// 	// this.props.fetchCreditsTotal();
// 	// }

// 	renderList = () => {
// 		const { credits } = this.props.credits;

// 		if (!this.props.credits) {
// 			return <div>Loading...</div>;
// 		}

// 		return this.props.credits.map((credits) => <CreditsListItem key={credits._id} {...credits} />);
// 	};

// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<div className="tasks-custom">
// 					<div className="">
// 						<div className="row">
// 							<div className="col-sm-12">
// 								<div className="table table-md">
// 									<table className="table">
// 										<thead>
// 											<tr>
// 												<th>Date</th>
// 												<th>Payment / Usage Reference</th>
// 												<th>Origin</th>
// 												<th>Amount</th>
// 												<th>Value</th>
// 											</tr>
// 										</thead>
// 										<tbody>{this.renderList()}</tbody>
// 									</table>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const mapStateToProps = (state) => {
	const sortByKey = (key) => (a, b) => (a[key] > b[key] ? -1 : 1);
	var credits = _.toArray(state.credits).slice(0);
	credits.sort(sortByKey('createdAt'));
	const loading = state.credits && state.credits.loading;

	return {
		credits       : credits,
		currentUserId : state.auth.userId,
		loading       : loading
	};
};

// const mapStateToProps = (state) => {
// 	return {
// 		credits       : _.toArray(state.credits),
// 		currentUserId : state.auth.userId
// 	};
// };

export default connect(mapStateToProps, { fetchCredits, getCredits })(CreditsList);
