import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { addContract } from '../../actions/contracts';

import OfferListItem from './offerListItem';
import selectLoads from '../../selectors/loads';
import Skeleton from '@yisheng90/react-loading';
import { fetchOffers, updateOffer, getOffers } from '../../actions/offer';
import axios from '../../apis/backend';
import _ from 'lodash';
import OfferListSpinner from '../spinners/offerListSpinner';

const OfferList = (props) => {
	const chatroomId = props.activeChatroom ? props.activeChatroom._id : '';
	const [ offers, setOffers ] = useState([]);
	const [ input, setInput ] = useState('');
	const [ isButtonDisabled, setisButtonDisabled ] = useState(false);
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState('');

	// useEffect(
	// 	() => {
	// 		let isSubscribed = true;
	// 		setIsLoading(true);

	// 		try {
	// 			axios
	// 				.get(`/api/offers`)
	// 				.then((response) => (isSubscribed ? (setOffers(response.data), setIsLoading(false)) : null));
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			console.log('There was an error', error);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	},
	// 	[ offers.length ]
	// );

	useEffect(() => {
		let isSubscribed = true;
		try {
			props.getOffers();
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	const onAcceptOffer = (formValues, offerId) => {
		props.addContract(formValues);
		props.updateOffer(offerId, { status: 'Accepted' });
		hideModal();
		//  props.fetchOffers();
	};

	const onDeclineOffer = (offerId, formValue) => {
		props.updateOffer(offerId, formValue);
		hideModal();
	};
	const onWithdrawOffer = (offerId, formValue) => {
		props.updateOffer(offerId, formValue);
		hideModal();
	};

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<React.Fragment>
			{console.log('props offer', props.offers)}

			{props.loading ? (
				<OfferListSpinner />
			) : (
				<section className="task-list">
					{props.offers.map((offer) => (
						<OfferListItem
							key={offer._id}
							{...offer}
							onAcceptOffer={onAcceptOffer}
							onDeclineOffer={onDeclineOffer}
							onWithdrawOffer={onWithdrawOffer}
						/>
					))}
				</section>
			)}
		</React.Fragment>
	);
};

// class OfferList extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			IsOpen : false
// 		};
// 	}

// 	componentDidMount() {
// 		// const userId = this.props.currentUserId ? this.props.currentUserId : '';

// 		if (this.props.currentUserId) {
// 			this.props.fetchOffers();
// 		}
// 	}

// 	componentDidUpdate(prevProps) {
// 		// this.props.fetchCredits();

// 		if (prevProps.currentUserId !== this.props.currentUserId) {
// 			this.props.fetchOffers();
// 		}
// 	}

// 	onSubmitOfferAction = (formValues) => {
// 		const transporter = this.props.activeChatroom.transporter._id;
// 		const load = this.props.activeChatroom.load;
// 		const proposal = this.props.activeChatroom.proposal;

// 		this.props.addOffer({ ...formValues, transporter, load, proposal });
// 		this.props.fetchOffers();
// 	};

// 	onAcceptOffer = (formValues, offerId) => {
// 		this.props.addContract(formValues);
// 		this.props.updateOffer(offerId, { status: 'Accepted' });
// 		this.props.fetchOffers();
// 	};

// 	onDeclineOffer = (offerId, formValue) => {
// 		this.props.updateOffer(offerId, formValue);
// 	};

// 	showModal = () => {
// 		this.setState({ IsOpen: true });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false });
// 	};

// 	renderComponentDetails = () => {
// 		if (!this.props.offers) {
// 			return <div>Loading</div>;
// 		}

// 		return (
// 			<section className='task-list'>
// 				{this.props.offers.map((offer) => (
// 					<OfferListItem
// 						key={offer._id}
// 						{...offer}
// 						onAcceptOffer={this.onAcceptOffer}
// 						onDeclineOffer={this.onDeclineOffer}
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
const mapStateToProps = (state) => {
	const loading = state.offers && state.offers.loading;

	console.log('the', state.offers);
	return {
		offers        : _.toArray(state.offers),
		currentUserId : state.auth.userId,
		loading       : loading
	};
};

export default connect(mapStateToProps, { fetchOffers, updateOffer, addContract, getOffers })(OfferList);
