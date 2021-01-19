import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { fetchProposal } from '../../actions/proposals';
import { updateOffer, fetchOffers } from '../../actions/offer';
import { Link } from 'react-router-dom';

import EndContractModalForm from './endContractModalForm';
import history from '../../history';

const AdminUsersListItem = (props) => {
	const [ content, setContent ] = useState('');
	const [ IsOpen, setIsOpen ] = useState(false);

	const showModal = (e) => {
		setIsOpen(true);
		setContent(e.target.value);
	};

	const hideModal = (e) => {
		setIsOpen(false);
		setContent('');
	};

	return (
		<React.Fragment>
			<tr>
				<td>{moment(props.createdAt).format('LL')}</td>
				<td>{props.name}</td>
				<td>{props.surname}</td>
				<td>{props.email}</td>
				<td>{props.phone}</td>
				<td>{props.address}</td>
				<td>{props.city}</td>
				<td>{props.userType}</td>
				<td>{props.status}</td>
				<td>
					<button
						className="btn btn-primary"
						onClick={() => {
							return history.push(`/admin/users/${props._id}`);
						}}
					>
						View
					</button>
				</td>
			</tr>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser : state.auth.userId
	};
};
export default connect(mapStateToProps, { fetchProposal, updateOffer, fetchOffers })(AdminUsersListItem);
