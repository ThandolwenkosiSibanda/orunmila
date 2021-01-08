import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import StarRating from '../rating/starRating';
import RatingCommunication from '../rating/ratingCommunication';
import RatingAdherenceToSchedule from '../rating/ratingAdherenceToSchedule';
import RatingCooperation from '../rating/ratingCooperation';
import RatingAvailability from '../rating/ratingAvailability';
import RatingQualityOfService from '../rating/ratingQualityOfService';
import { updateContract } from '../../actions/contracts';
import { addRating } from '../../actions/ratings';

// const EndContractModalForm = (props) => {};

const EndContractModalForm = (props) => {
	const [ communicationTotal, setCommunicationTotal ] = useState(0);
	const [ adherenceTotal, setAdherenceTotal ] = useState(0);
	const [ cooperationTotal, setCooperationTotal ] = useState(0);
	const [ availabilityTotal, setAvailabilityTotal ] = useState(0);
	const [ qualityTotal, setQualityTotal ] = useState(0);
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ error, setError ] = useState('');

	useEffect(() => {
		let isSubscribed = true;
		try {
			console.log('This is an err');
		} catch (err) {
			setError(err);
		}
		return () => (isSubscribed = false);
	}, []);

	const hideModal = (e) => {
		setIsOpen(false);
	};

	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

	const renderInput = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="from">{capitalize(input.name)}</label>
				<input {...input} className={className} autoComplete="off" />
				{renderError(meta)}
			</div>
		);
	};

	const renderSelect = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<label htmlFor="reason">{capitalize(input.name)}</label>
				<select className={className} {...input}>
					<option>~Choose A Reason~</option>
					<option value="success">Load Successfully Transported</option>
					<option value="notNeeded">Services No Longer Needed</option>
					<option value="failure">Failure To Transport Load</option>
				</select>

				{renderError(meta)}
			</div>
		);
	};

	const renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<textarea {...input} className={className} placeholder="Type your message here..." />
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = (formValues) => {
		props.onHide();

		if (props.currentUserId == props.contract.client._id) {
			const client = props.contract.client._id;
			const transporter = props.contract.transporter._id;
			const load = props.contract.load._id;
			const contract = props.contract._id;
			const transporterComment = formValues.privateComment;
			const transporterCommunication = communicationTotal;
			const transporterAdherenceToSchedule = adherenceTotal;
			const transporterCooperation = cooperationTotal;
			const transporterAvailability = availabilityTotal;
			const transporterQualityOfService = qualityTotal;

			props.addRating({
				client,
				transporter,
				load,
				contract,
				transporterComment,
				transporterCommunication,
				transporterAdherenceToSchedule,
				transporterCooperation,
				transporterAvailability,
				transporterQualityOfService
			});

			props.updateContract(contract, { status: 'Closed', clientStatus: 'Closed' });
		} else {
			const transporter = props.contract.transporter._id;
			const client = props.contract.client._id;
			const load = props.contract.load._id;
			const contract = props.contract._id;
			const clientComment = formValues.privateComment;
			const clientCommunication = communicationTotal;
			const clientAdherenceToSchedule = adherenceTotal;
			const clientCooperation = cooperationTotal;
			const clientAvailability = availabilityTotal;
			const clientQualityOfService = qualityTotal;

			props.addRating({
				transporter,
				client,
				load,
				contract,
				clientComment,
				clientCommunication,
				clientAdherenceToSchedule,
				clientCooperation,
				clientAvailability,
				clientQualityOfService
			});

			props.updateContract(contract, { status: 'Closed', transporterStatus: 'Closed' });
		}
	};

	const communicationTotalF = (total) => {
		setCommunicationTotal(total);
	};

	const adherenceTotalF = (total) => {
		setAdherenceTotal(total);
	};

	const cooperationTotalF = (total) => {
		setCooperationTotal(total);
	};
	const availabilityTotalF = (total) => {
		setAvailabilityTotal(total);
	};
	const qualityTotalF = (total) => {
		setQualityTotal(total);
	};

	const totalScore = () => {
		return ((communicationTotal + adherenceTotal + cooperationTotal + availabilityTotal + qualityTotal) /
			25 *
			5).toFixed(2);
	};

	return (
		<React.Fragment>
			<ModalHeader closeButton>{props.content}</ModalHeader>

			<ModalBody>
				<form onSubmit={props.handleSubmit(onSubmit)}>
					<div className="row">
						<div className="col-sm-12">
							<Field name="reason" component={renderSelect} />
						</div>

						<div className="col-sm-12">
							<h4>
								{props.currentUserId == props.contract.client._id ? (
									`Feedback To Transporter`
								) : (
									`Feedback to Client`
								)}{' '}
							</h4>
							<label>Private Comment (Only Available to TruckZim)</label>
							<Field name="privateComment" component={renderTextArea} />
						</div>

						<div className="col-sm-12">
							<label>Public Comment (Available to everyone in the community)</label>
							<Field name="publicComment" component={renderTextArea} />
						</div>

						<div className="col-sm-12">
							<div className="row">
								<div className="form-group">
									<div className="col-sm-12">
										<RatingCommunication name="communicationTotal" total={communicationTotalF} />
										<span>Communication </span>
									</div>
									<div className="col-sm-12">
										<RatingAdherenceToSchedule name="adherenceTotal" total={adherenceTotalF} />
										<span>Adherence To Schedule </span>
									</div>
									<div className="col-sm-12">
										<RatingCooperation name="cooperationTotal" total={cooperationTotalF} />
										<span>Co-operation </span>
									</div>
									<div className="col-sm-12">
										<RatingAvailability name="availabilityTotal" total={availabilityTotalF} />
										<span>Availability </span>
									</div>
									<div className="col-sm-12">
										<RatingQualityOfService total={qualityTotalF} />
										<span>Quality Of Service </span>
									</div>
								</div>
							</div>
							<h5>Total Score: {totalScore()}</h5>
						</div>
					</div>

					<div className="modal-footer custom">
						<button type="button" className="btn btn-link danger" onClick={props.onHide}>
							Cancel
						</button>

						<button type="submit" className="btn btn-link success">
							{props.content}
						</button>
					</div>
				</form>
			</ModalBody>
		</React.Fragment>
	);
};

// class EndContractModalForm extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			communicationTotal : 0,
// 			adherenceTotal     : 0,
// 			cooperationTotal   : 0,
// 			availabilityTotal  : 0,
// 			qualityTotal       : 0,
// 			IsOpen             : false
// 		};

// 		this.submitButton = React.createRef();
// 	}

// 	hideModal = () => {
// 		this.setState({ IsOpen: false });
// 	};

// 	renderError = ({ error, touched }) => {
// 		if (touched && error) {
// 			return <p style={{ color: 'red' }}>*{error}</p>;
// 		} else {
// 		}
// 	};

// 	capitalize = (s) => s[0].toUpperCase() + s.slice(1);

// 	renderInput = ({ input, meta }) => {
// 		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
// 		return (
// 			<div className="form-group">
// 				<label htmlFor="from">{this.capitalize(input.name)}</label>
// 				<input {...input} className={className} autoComplete="off" />
// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	};

// 	renderSelect = ({ input, meta }) => {
// 		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
// 		return (
// 			<div className="form-group">
// 				<label htmlFor="reason">{this.capitalize(input.name)}</label>
// 				<select className={className} {...input}>
// 					<option>~Choose A Reason~</option>
// 					<option value="success">Load Successfully Transported</option>
// 					<option value="notNeeded">Services No Longer Needed</option>
// 					<option value="failure">Failure To Transport Load</option>
// 				</select>

// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	};

// 	renderTextArea = ({ input, meta }) => {
// 		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
// 		return (
// 			<div className="form-group">
// 				<textarea {...input} className={className} placeholder="Type your message here..." />
// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	};

// 	onSubmit = (formValues) => {
// 		this.props.onHide();
// 		// console.log('Contract Ended');
// 		//this.props.onSubmit(formValues);
// 		// console.log('Accepted Offer');

// 		//Update the status of the contract to Archived

// 		// Update Save the rating to the database

// 		// console.log('id', this.props.currentUserId);

// 		// this.props.updateContract(this.props.contract._id, { status: 'Archived' });

// 		if (this.props.currentUserId == this.props.contract.client._id) {
// 			const client = this.props.contract.client._id;
// 			const transporter = this.props.contract.transporter._id;
// 			const load = this.props.contract.load._id;
// 			const contract = this.props.contract._id;
// 			const transporterComment = formValues.privateComment;
// 			const transporterCommunication = this.state.communicationTotal;
// 			const transporterAdherenceToSchedule = this.state.adherenceTotal;
// 			const transporterCooperation = this.state.cooperationTotal;
// 			const transporterAvailability = this.state.availabilityTotal;
// 			const transporterQualityOfService = this.state.qualityTotal;

// 			this.props.addRating({
// 				client,
// 				transporter,
// 				load,
// 				contract,
// 				transporterComment,
// 				transporterCommunication,
// 				transporterAdherenceToSchedule,
// 				transporterCooperation,
// 				transporterAvailability,
// 				transporterQualityOfService
// 			});
// 		} else {
// 			const transporter = this.props.contract.transporter._id;
// 			const client = this.props.contract.client._id;
// 			const load = this.props.contract.load._id;
// 			const contract = this.props.contract._id;
// 			const clientComment = formValues.privateComment;
// 			const clientCommunication = this.state.communicationTotal;
// 			const clientAdherenceToSchedule = this.state.adherenceTotal;
// 			const clientCooperation = this.state.cooperationTotal;
// 			const clientAvailability = this.state.availabilityTotal;
// 			const clientQualityOfService = this.state.qualityTotal;

// 			this.props.addRating({
// 				transporter,
// 				client,
// 				load,
// 				contract,
// 				clientComment,
// 				clientCommunication,
// 				clientAdherenceToSchedule,
// 				clientCooperation,
// 				clientAvailability,
// 				clientQualityOfService
// 			});
// 		}
// 	};

// 	communicationTotal = (total) => {
// 		//console.log('Communication Totals', total);
// 		this.setState({ communicationTotal: total });
// 		// return total;
// 	};

// 	adherenceTotal = (total) => {
// 		//this.setState({ adherenceTotal: total });
// 		// console.log('Adherence Total', total);
// 		this.setState({ adherenceTotal: total });
// 		//return total;
// 	};

// 	cooperationTotal = (total) => {
// 		this.setState({ cooperationTotal: total });
// 		// console.log('Cooperation Total', total);
// 		//return total;
// 	};
// 	availabilityTotal = (total) => {
// 		this.setState({ availabilityTotal: total });
// 		//console.log('Availability Total', total);
// 		//return total;
// 	};
// 	qualityTotal = (total) => {
// 		this.setState({ qualityTotal: total });
// 		// console.log('Quality Total', total);
// 		//return total;
// 	};

// 	totalScore = () => {
// 		return ((this.state.communicationTotal +
// 			this.state.adherenceTotal +
// 			this.state.cooperationTotal +
// 			this.state.availabilityTotal +
// 			this.state.qualityTotal) /
// 			25 *
// 			5).toFixed(2);
// 	};

// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<ModalHeader closeButton>{this.props.content}</ModalHeader>

// 				<ModalBody>
// 					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
// 						<div className="row">
// 							<div className="col-sm-12">
// 								<Field name="reason" component={this.renderSelect} />
// 							</div>

// 							<div className="col-sm-12">
// 								<h4>
// 									{this.props.currentUserId == this.props.contract.client._id ? (
// 										`Feedback To Transporter`
// 									) : (
// 										`Feedback to Client`
// 									)}{' '}
// 								</h4>
// 								<label>Private Comment (Only Available to TruckZim)</label>
// 								<Field name="privateComment" component={this.renderTextArea} />
// 							</div>

// 							<div className="col-sm-12">
// 								<label>Public Comment (Available to everyone in the community)</label>
// 								<Field name="publicComment" component={this.renderTextArea} />
// 							</div>

// 							<div className="col-sm-12">
// 								<div className="row">
// 									<div className="form-group">
// 										<div className="col-sm-12">
// 											<RatingCommunication
// 												name="communicationTotal"
// 												total={this.communicationTotal}
// 											/>
// 											<span>Communication </span>
// 										</div>
// 										<div className="col-sm-12">
// 											<RatingAdherenceToSchedule
// 												name="adherenceTotal"
// 												total={this.adherenceTotal}
// 											/>
// 											<span>Adherence To Schedule </span>
// 										</div>
// 										<div className="col-sm-12">
// 											<RatingCooperation name="cooperationTotal" total={this.cooperationTotal} />
// 											<span>Co-operation </span>
// 										</div>
// 										<div className="col-sm-12">
// 											<RatingAvailability
// 												name="availabilityTotal"
// 												total={this.availabilityTotal}
// 											/>
// 											<span>Availability </span>
// 										</div>
// 										<div className="col-sm-12">
// 											<RatingQualityOfService total={this.qualityTotal} />
// 											<span>Quality Of Service </span>
// 										</div>
// 									</div>
// 								</div>
// 								<h5>Total Score: {this.totalScore()}</h5>
// 							</div>
// 						</div>

// 						<div className="modal-footer custom">
// 							<button type="button" className="btn btn-link danger" onClick={this.props.onHide}>
// 								Cancel
// 							</button>

// 							<button type="submit" className="btn btn-link success">
// 								{this.props.content}
// 							</button>
// 						</div>
// 					</form>
// 				</ModalBody>
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const validate = (formValues) => {
	const errors = {};
	if (!formValues.reason) {
		errors.reason = 'Please Select A Reason';
	}

	if (!formValues.privateComment) {
		errors.privateComment = 'Please enter a comment';
	}
	if (!formValues.publicComment) {
		errors.publicComment = 'Please enter a comment';
	}

	return errors;
};

const formWrapped = reduxForm({
	form     : 'EndContract',
	validate : validate
})(EndContractModalForm);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { updateContract, addRating })(formWrapped);
