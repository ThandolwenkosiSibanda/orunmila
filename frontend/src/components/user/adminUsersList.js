import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { addContract } from '../../actions/contracts';

import AdminUsersListItem from './adminUsersListItem';
import selectLoads from '../../selectors/loads';
import axios from '../../apis/backend';
import Skeleton from '@yisheng90/react-loading';
import { fetchUsers } from '../../actions/users';
import _ from 'lodash';
import ContractListSpinner from '../spinners/contractListSpinner';

const AdminUsersDashboard = (props) => {
	const chatroomId = props.activeChatroom ? props.activeChatroom._id : '';
	const [ users, setUsers ] = useState([]);
	const [ input, setInput ] = useState('');
	const [ isButtonDisabled, setisButtonDisabled ] = useState(false);
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;
			setIsLoading(true);

			try {
				axios
					.get(`/api/admin/users?status=${props.userStatus}`)
					.then((response) => (isSubscribed ? (setUsers(response.data), setIsLoading(false)) : null));
			} catch (error) {
				setIsLoading(false);
				console.log('There was an error', error);
			}
			return () => (isSubscribed = false);
		},
		[ users.length ]
	);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	const renderList = () => {
		return users.map((user) => <AdminUsersListItem key={user._id} {...user} userStatus={props.userStatus} />);
	};

	return (
		<React.Fragment>
			{props.loading ? (
				<ContractListSpinner />
			) : (
				<div className="tasks-custom">
					<div className="">
						<div className="row">
							<div className="col-sm-12">
								<div className="table-md table-responsive-sm">
									<table className="table">
										<thead>
											<tr>
												<th>Joined</th>
												<th>Name</th>
												<th>Surname</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Address</th>
												<th>City</th>
												<th>Type</th>
												<th>Status</th>
												<th>Action</th>
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

const mapStateToProps = (state) => {
	return {
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fetchUsers })(AdminUsersDashboard);
