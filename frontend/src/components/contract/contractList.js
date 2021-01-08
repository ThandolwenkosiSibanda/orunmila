import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { addContract } from '../../actions/contracts';

import ContractListItem from './contractListItem';
import selectLoads from '../../selectors/loads';
import axios from '../../apis/backend';
import Skeleton from '@yisheng90/react-loading';
import { fetchContracts, updateContract, getContracts } from '../../actions/contracts';
import _ from 'lodash';
import ContractListSpinner from '../spinners/contractListSpinner';

const ContractList = (props) => {
	const chatroomId = props.activeChatroom ? props.activeChatroom._id : '';
	const [ contracts, setContracts, getContracts ] = useState([]);
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
	// 				.get(`/api/contracts`)
	// 				.then((response) => (isSubscribed ? (setContracts(response.data), setIsLoading(false)) : null));
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			console.log('There was an error', error);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	},
	// 	[ contracts.length ]
	// );

	useEffect(
		() => {
			let isSubscribed = true;
			try {
				props.getContracts(props.status);
			} catch (err) {
				setError(err);
			}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<React.Fragment>
			{props.loading ? (
				<ContractListSpinner />
			) : (
				<section className="task-list">
					{props.contracts.map((contract) => (
						<ContractListItem key={contract._id} {...contract} status={props.status} />
					))}
				</section>
			)}
		</React.Fragment>
	);
};

// class ContractList extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			IsOpen : false
// 		};
// 	}

// 	componentDidMount() {
// 		// const userId = this.props.currentUserId ? this.props.currentUserId : '';

// 		if (this.props.currentUserId) {
// 			this.props.fetchContracts();
// 		}
// 	}

// 	componentDidUpdate(prevProps) {
// 		// this.props.fetchCredits();

// 		if (prevProps.currentUserId !== this.props.currentUserId) {
// 			this.props.fetchContracts();
// 		}
// 	}

// 	onSubmitOfferAction = (formValues) => {
// 		const transporter = this.props.activeChatroom.transporter._id;
// 		const load = this.props.activeChatroom.load;
// 		const proposal = this.props.activeChatroom.proposal;

// 		this.props.addOffer({ ...formValues, transporter, load, proposal });
// 		this.props.fetchContracts();
// 	};

// 	onAcceptOffer = (formValues, offerId) => {
// 		this.props.addContract(formValues);
// 		this.props.updateContract(offerId, { status: 'Accepted' });
// 		this.props.fetchContracts();
// 	};

// 	onDeclineOffer = (offerId, formValue) => {
// 		this.props.updateContract(offerId, formValue);
// 	};

// 	showModal = () => {
// 		this.setState({ IsOpen: true });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false });
// 	};

// 	renderComponentDetails = () => {
// 		if (!this.props.contracts) {
// 			return <div>Loading</div>;
// 		}

// 		return (
// 			<section className="task-list">
// 				{this.props.contracts.map((contract) => (
// 					<ContractListItem
// 						key={contract._id}
// 						{...contract}
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
	const loading = state.contracts && state.contracts.loading;
	return {
		contracts     : _.toArray(state.contracts),
		currentUserId : state.auth.userId,
		loading       : loading
	};
};

export default connect(mapStateToProps, { fetchContracts, updateContract, addContract, getContracts })(ContractList);
