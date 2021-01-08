import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import UserForm from './userForm';
import axios from '../../apis/backend';
import { addUser, updateUser, updateUserStatus } from '../../actions/users';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';

const AdminUserView = (props) => {
	const userId = props.userId ? props.userId : '';
	const [ user, setUser ] = useState({});
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ status, setStatus ] = useState('');
	const [ reason, setReason ] = useState('');
	const [ isButtonDisabled, setisButtonDisabled ] = useState(false);
	const [ IsLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState('');

	const showModal = (e) => {
		setIsOpen(true);
		setContent(e.content);
		setStatus(e.status);
	};

	const hideModal = (e) => {
		setIsOpen(false);
		setContent('');
		setStatus('');
	};

	const onSubmit = (e) => {
		e.preventDefault();
		hideModal();
		// console.log('User Id', user._id);
		// console.log('Content', { content, reason, status });
		props.updateUserStatus(userId, { status, reason });
	};

	useEffect(
		() => {
			let isSubscribed = true;
			setIsLoading(true);

			try {
				axios
					.get(`/api/admin/users/${userId}`)
					.then((response) => (isSubscribed ? (setUser(response.data), setIsLoading(false)) : null));
			} catch (error) {
				setIsLoading(false);
				console.log('There was an error', error);
			}
			return () => (isSubscribed = false);
		},
		[ userId ]
	);

	return (
		<React.Fragment>
			<div className="main-container">
				<div className="page-header">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active">
							Profile: {user.name} {user.surname}
						</li>
					</ol>
				</div>

				<div className="content-wrapper">
					<React.Fragment>
						<div>
							<div className="row gutters">
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
									<div className="card h-100">
										<div className="card-body">
											<div className="account-settings">
												<div className="user-profile">
													<div className="user-avatar">
														<img />
													</div>
													<h5 className="user-name">
														{' '}
														{user.name} {user.surname}
													</h5>
												</div>
												<div className="nationalID">
													<img />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
									<div className="card h-100">
										<div className="card-header">
											<div className="card-title" />
										</div>
										<div className="card-body">
											<div className="row gutters">
												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">Name</label>
														<div className="form-control">{user.name}</div>
													</div>
												</div>
												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">Surname</label>
														<div className="form-control">{user.surname}</div>
													</div>
												</div>

												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">Phone</label>
														<div className="form-control">{user.phone}</div>
													</div>
												</div>

												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">Email</label>
														<div className="form-control">{user.email}</div>
													</div>
												</div>
												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">National ID</label>
														<div className="form-control">{user.nationalIdNo}</div>
													</div>
												</div>
												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">City</label>
														<div className="form-control">{user.city}</div>
													</div>
												</div>
												<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
													<div className="form-group">
														<label htmlFor="amount">Country</label>
														<div className="form-control">{user.country}</div>
													</div>
												</div>
												<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
													{' '}
													<div className="form-group">
														<label htmlFor="amount">Address</label>
														<div className="form-control">{user.address}</div>
													</div>
												</div>
											</div>

											<div className="float-left">
												<button type="submit" className="btn btn-link success ">
													Back To List
												</button>
											</div>
											<div className="float-right">
												<button
													type="button "
													className="btn btn-link danger"
													value="Reject User"
													onClick={() =>
														showModal({
															status  : 'Rejected',
															content : 'Reject User',
															status  : 'Rejected'
														})}
												>
													Reject
												</button>

												<button
													type="submit"
													className="btn btn-link success "
													value="Approve User"
													onClick={() =>
														showModal({
															status  : 'Approved',
															content : 'Approve User',
															status  : 'Verified'
														})}
												>
													Approve
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				</div>
			</div>

			<Modal show={IsOpen} onHide={hideModal}>
				<ModalHeader closeButton>
					<h6>{content}</h6>{' '}
				</ModalHeader>
				<ModalBody>
					<form onSubmit={onSubmit}>
						<div className="row">
							<div className="col-sm-12">
								<h6>Are You Sure You Want To {content} </h6>

								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<div className="form-group">
											<label htmlFor="reason">Reason</label>
											<input
												className="form-control"
												autoComplete="off"
												value={reason}
												onChange={(e) => {
													setReason(e.target.value);
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="modal-footer custom">
							<button type="button" className="btn btn-link danger" onClick={hideModal}>
								Cancel
							</button>

							<button type="submit" className="btn btn-link success" onClick={onSubmit}>
								Confirm
							</button>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state, OwnProps) => {
	console.log('own Propos', OwnProps.match.params.id);
	return {
		isSignedIn : state.auth.isSignedIn,
		userId     : OwnProps.match.params.id
	};
};

export default connect(mapStateToProps, { addUser, updateUser, updateUserStatus })(AdminUserView);
