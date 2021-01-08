import React, { Component, useState, useEffect } from 'react';
import { fetchCreditsTotal } from '../../actions/creditsTotal';
import Modal from 'react-bootstrap/Modal';
import BuyCreditsModal from './buyCreditsModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import CreditsList from './creditsList';

const CreditsDashboardPage = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ loadId, setLoadId ] = useState('');

	useEffect(() => {
		let isSubscribed = true;

		try {
			props.fetchCreditsTotal();
		} catch (error) {
			console.log('There was an error', error);
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

	const onSubmit = (formValues) => {
		props.addCredits(formValues);
	};

	const renderCreditsTotal = () => {
		if (!props.creditsTotal) {
			return <div>Calculating...</div>;
		}

		return <span>{props.creditsTotal}</span>;
	};

	return (
		<React.Fragment>
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">Available Credits: {renderCreditsTotal()}</li>
				</ol>
				<button className="btn btn-primary btn-lg " onClick={showModal}>
					Purchase Credits
				</button>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<CreditsList />
					</div>
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal}>
				<BuyCreditsModal onSubmit={onSubmit} onHide={hideModal} />
			</Modal>
		</React.Fragment>
	);
};

// class CreditsDashboardPage extends Component {
// 	constructor(props) {
// 		super(props);
// 		// ({ dispatch, id, from, to, estimatedWeight, estimatedBudget, description })
// 		this.state = {
// 			IsOpen : false,
// 			loadId : ''
// 		};
// 	}

// 	showModal = (e) => {
// 		e.preventDefault();
// 		const id = e.currentTarget.id;
// 		this.setState({ IsOpen: true, loadId: id });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false, loadId: '' });
// 	};

// 	onSubmit = (formValues) => {
// 		this.props.addCredits(formValues);
// 	};
// 	componentDidMount() {
// 		if (this.props.currentUserId) {
// 			this.props.fetchCreditsTotal();
// 		}
// 	}
// 	renderCreditsTotal = () => {
// 		if (!this.props.creditsTotal) {
// 			return <div>Loading...</div>;
// 		}

// 		return <span>{this.props.creditsTotal}</span>;
// 	};
// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<div className="page-header">
// 					<ol className="breadcrumb">
// 						<li className="breadcrumb-item active">Available Credits: {this.renderCreditsTotal()}</li>
// 					</ol>
// 					<button className="btn btn-primary btn-lg " onClick={this.showModal}>
// 						Purchase Credits
// 					</button>
// 				</div>

// 				<div className="content-wrapper">
// 					<div className="row gutters">
// 						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
// 							<CreditsList />
// 						</div>
// 					</div>
// 				</div>

// 				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
// 					<BuyCreditsModal onSubmit={this.onSubmit} onHide={this.hideModal} />
// 				</Modal>
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const mapStateToProps = (state) => {
	let creditsTotal = _.toArray(state.creditsTotal)[0] ? _.toArray(state.creditsTotal)[0].total : 0;
	return {
		isSignedIn   : state.auth.isSignedIn,
		creditsTotal : creditsTotal
	};
};

export default connect(mapStateToProps, { fetchCreditsTotal })(CreditsDashboardPage);
