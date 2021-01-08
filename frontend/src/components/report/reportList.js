import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { addContract } from '../../actions/contracts';

import ReportListItem from './reportListItem';
import selectLoads from '../../selectors/loads';
import { fetchOffers, updateOffer } from '../../actions/offer';
import _ from 'lodash';

// const LoadsList = (props) => (
// 	<div className='row gutters'>{props.loads.map((load) => <LoadListItem key={load._id} {...load} />)}</div>
// );

class OfferList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			IsOpen : false
		};
	}

	componentDidMount() {
		// const userId = this.props.currentUserId ? this.props.currentUserId : '';

		if (this.props.currentUserId) {
			this.props.fetchOffers();
		}
	}

	componentDidUpdate(prevProps) {
		// this.props.fetchCredits();

		if (prevProps.currentUserId !== this.props.currentUserId) {
			this.props.fetchOffers();
		}
	}

	onSubmitOfferAction = (formValues) => {
		const transporter = this.props.activeChatroom.transporter._id;
		const load = this.props.activeChatroom.load;
		const proposal = this.props.activeChatroom.proposal;

		this.props.addOffer({ ...formValues, transporter, load, proposal });
		this.props.fetchOffers();
	};

	onAcceptOffer = (formValues, offerId) => {
		this.props.addContract(formValues);
		this.props.updateOffer(offerId, { status: 'Accepted' });
		this.props.fetchOffers();
	};

	onDeclineOffer = (offerId, formValue) => {
		this.props.updateOffer(offerId, formValue);
	};

	showModal = () => {
		this.setState({ IsOpen: true });
	};

	hideModal = () => {
		this.setState({ IsOpen: false });
	};

	renderComponentDetails = () => {
		if (!this.props.offers) {
			return <div>Loading</div>;
		}

		return (
			<section className='task-list'>
				{this.props.offers.map((offer) => (
					<ReportListItem
						key={offer._id}
						{...offer}
						onAcceptOffer={this.onAcceptOffer}
						onDeclineOffer={this.onDeclineOffer}
					/>
				))}
			</section>
		);
	};

	render() {
		console.log('offers List', this.props.offers);
		return this.renderComponentDetails();
	}
}

//This is the standard way of creating a function that is passed to connect,
// This is the function that determines what to get fro the store and it returns an object
const mapStateToProps = (state) => {
	return {
		offers        : _.toArray(state.offers),
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { fetchOffers, updateOffer, addContract })(OfferList);
