import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
// The purpose of the connect wrapper is to communicate with the provider in order to get the store

class ReviewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarPreview : null,
			avatar        : null,
			CSV           : null,
			CSVPreview    : null
		};
	}
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
				<label htmlFor="from">{this.capitalize(input.name)}</label>
				<input {...input} className={className} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{this.capitalize(input.name)}</label>

				<textarea {...input} className={className} rows="12" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderSelect = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="select">{this.capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option>~Select Threshold~</option>
					<option value="25">25%</option>
					<option value="50">50%</option>
					<option value="75">75%</option>
					<option value="100">100%</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderWeightUnit = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="weightUnit">{this.capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option value="kgs">Kilogrammes (kg)</option>
					<option value="tonnes">Tonnes</option>
					<option value="Metric Tonnes">Metric Tonnes</option>
				</select>

				{this.renderError(meta)}
			</div>
		);
	};

	renderCSV = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="CSV" className="custom-file-upload">
					<i className="fa fa-cloud-upload" /> Upload The CSV File
				</label>
				<input
					name="csv"
					id="CSV"
					accept=".jpg, .png, .jpeg, .csv"
					type="file"
					onChange={this.handleCSVChange}
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	handleCSVChange = (event) => {
		if (event.target.files[0]) {
			this.setState({
				CSVPreview : URL.createObjectURL(event.target.files[0]),
				CSV        : event.target.files[0]
			});
		}
	};

	onSubmit = (formValues) => {
		let csv = this.state.CSV ? this.state.CSV : '';

		console.log('csv', csv);
		this.props.onSubmit(formValues, csv);
	};

	renderComponentDetails = () => {
		if (!this.props) {
			return <div>Loading</div>;
		}

		return (
			<React.Fragment>
				<ModalHeader closeButton>
					<h6>Add New Project</h6>
				</ModalHeader>
				<ModalBody>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className=" card">
									<div className="card-body">
										<div className="row gutters">
											<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
												<Field name="title" component={this.renderInput} />
											</div>

											<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
												<img
													src={
														this.state.CSVPreview ? (
															this.state.CSVPreview
														) : this.props.currentUserAvatar ? (
															`/images/${this.props.CSV}`
														) : (
															''
														)
													}
												/>

												<Field name="CSV" component={this.renderCSV} />
											</div>
										</div>
									</div>

									<div className="modal-footer custom">
										<button
											type="button"
											className="btn btn-link danger"
											onClick={this.props.hideModal}
										>
											Cancel
										</button>
										<button type="submit" className="btn btn-link success ">
											Submit Project
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</ModalBody>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'Please enter a valid title';
	}
	if (!formValues.journal) {
		errors.journal = 'Please enter a valid journal name';
	}

	if (!formValues.refID) {
		errors.refID = 'Please enter a valid refID';
	}
	if (!formValues.url) {
		errors.url = 'Please enter a valid url';
	}
	if (!formValues.abstract) {
		errors.abstract = 'Please enter your abstract';
	}
	if (!formValues.threshold || formValues.threshold === '~Select Threshold~') {
		errors.threshold = 'Please choose a threshold';
	}

	return errors;
};

export default reduxForm({
	form     : 'reviewForm',
	validate : validate
})(ReviewForm);
