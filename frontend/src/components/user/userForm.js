import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import './userForm.css';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarPreview     : null,
			avatar            : null,
			nationalID        : null,
			nationalIDPreview : null
		};
	}

	componentDidMount() {
		this.loadImages();
	}

	loadImages() {
		// fetch('http://localhost:4000/images/2a630b5c829e23a167a58f5f0acb73f0.jpg')
		// 	.then((res) => res.json())
		// 	.then((files) => {
		// 		if (files.message) {
		// 			console.log('No Files');
		// 			// this.setState({ files: [] });
		// 		} else {
		// 			console.log(files);
		// 			// this.setState({ files });
		// 		}
		// 	});
		// axios.get(`http://localhost:4000/images/2a630b5c829e23a167a58f5f0acb73f0.jpg`).then((res) => {
		// 	// console.log(res.data);
		// 	// this.setState({ preview: URL.createObjectURL(res.data) });
		// });
	}

	handleAvatarChange = (event) => {
		if (event.target.files[0]) {
			this.setState({
				avatarPreview : URL.createObjectURL(event.target.files[0]),
				avatar        : event.target.files[0]
			});
		}
	};
	handleNationalIDChange = (event) => {
		if (event.target.files[0]) {
			this.setState({
				nationalIDPreview : URL.createObjectURL(event.target.files[0]),
				nationalID        : event.target.files[0]
			});
		}
	};

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};
	capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="amount">{this.capitalize(input.name).substring(4)}</label>
				<input {...input} className={className} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderSelect = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="currency">{this.capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option value="USD">USD</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderCity = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="currency">{this.capitalize(input.name).substring(4)}</label>
				<select className={className} {...input}>
					<option value="Bulawayo">Bulawayo</option>
					<option value="Harare">Harare</option>
					<option value="Gweru">Gweru</option>
					<option value="Kwekwe">kwekwe</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderCountry = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor={input.name}>{this.capitalize(input.name).substring(4)}</label>
				<select className={className} {...input}>
					<option value="Zimbabwe">Zimbabwe</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="message">{this.capitalize(input.name).substring(4)}</label>
				<textarea {...input} className={className} placeholder="Full Address" autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderAvatar = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="file-upload" className="custom-file-upload">
					<i className="fa fa-cloud-upload" /> Upload Photo
				</label>
				<input
					name="avatar"
					id="file-upload"
					accept=".jpg, .png, .jpeg"
					type="file"
					onChange={this.handleAvatarChange}
				/>
				{this.renderError(meta)}
			</div>
		);
	};
	renderNationalID = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="nationalID" className="custom-file-upload">
					<i className="fa fa-cloud-upload" /> Upload A Clear National ID Or Passport
				</label>
				<input
					name="nationalId"
					id="nationalID"
					accept=".jpg, .png, .jpeg"
					type="file"
					onChange={this.handleNationalIDChange}
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		let avatar = this.state.avatar ? this.state.avatar : '';
		let nationalID = this.state.nationalID ? this.state.nationalID : '';
		this.props.onSubmitUser(formValues, avatar, nationalID);
	};

	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<div className="row gutters">
						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
							<div className="card h-100">
								<div className="card-body">
									<div className="account-settings">
										<div className="user-profile">
											<div className="user-avatar">
												<img
													src={
														this.state.avatarPreview ? (
															this.state.avatarPreview
														) : this.props.currentUserAvatar ? (
															`/images/${this.props.currentUserAvatar}`
														) : (
															''
														)
													}
												/>

												<Field name="userAvatar" component={this.renderAvatar} />
											</div>
											<h5 className="user-name">
												{this.props.currentUserName} {this.props.currentUserSurname}{' '}
											</h5>
											<h6 className="user-email">{this.props.currentUserEmail}</h6>
										</div>
										<div className="nationalID">
											<img
												src={
													this.state.nationalIDPreview ? (
														this.state.nationalIDPreview
													) : this.props.currentUserNationalID ? (
														`/images/${this.props.currentUserNationalID}`
													) : (
														''
													)
												}
											/>
											<Field name="userNationalID" component={this.renderNationalID} />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
							<div className="card h-100">
								<div className="card-header">
									<div className="card-title" />
								</div>
								<div className="card-body">
									<div className="row gutters">
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userName" component={this.renderInput} />
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userSurname" component={this.renderInput} />
										</div>

										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userPhone" component={this.renderInput} />
										</div>

										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userEmail" component={this.renderInput} />
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userNationalIdNo" component={this.renderInput} />
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userCity" component={this.renderCity} />
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<Field name="userCountry" component={this.renderCountry} />
										</div>
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<Field name="userAddress" component={this.renderTextArea} />
										</div>
									</div>
									<div className="float-right">
										<button type="button " className="btn btn-link danger">
											Cancel
										</button>

										<button type="submit" className="btn btn-link success ">
											Submit For Verification
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.userName) {
		errors.userName = 'Please enter a valid name';
	}

	if (!formValues.userSurname) {
		errors.userSurname = 'Please enter a surname';
	}

	if (!formValues.userPhone) {
		errors.userPhone = 'Please enter a valid phone number';
	}

	if (!formValues.userEmail) {
		errors.userEmail = 'Please choose a valid email';
	}

	if (!formValues.currentUserNationalIdNo) {
		errors.currentUserNationalIdNo = 'Please choose a valid national ID';
	}

	if (!formValues.userCity) {
		errors.userCity = 'Please choose a valid city';
	}
	if (!formValues.userCountry) {
		errors.userCountry = 'Please choose a valid country';
	}

	if (!formValues.userAddress) {
		errors.userAddress = 'Please choose a valid address';
	}

	return errors;
};

const formWrapped = reduxForm({
	form               : 'addNewUser',
	validate           : validate,
	enableReinitialize : true
})(UserForm);

const mapStateToProps = (state) => {
	return {
		initialValues           : state.auth, // retrieve name from redux store
		currentUserId           : state.auth.userId,
		currentUserName         : state.auth.userName,
		currentUserSurname      : state.auth.userSurname,
		currentUserEmail        : state.auth.userEmail,
		currentUserAvatar       : state.auth.userAvatar,
		currentUserNationalID   : state.auth.userNationalID,
		currentUserNationalIdNo : state.auth.userNationalIdNo
	};
};

export default connect(mapStateToProps)(formWrapped);
