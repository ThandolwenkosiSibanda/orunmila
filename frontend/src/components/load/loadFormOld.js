import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { reduxForm, Field } from 'redux-form';

class LoadForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			from            : props.load ? props.load.from : '',
			to              : props.load ? props.load.to : '',
			estimatedWeight : props.load ? props.load.estimatedWeight : '',
			estimatedBudget : props.load ? props.load.estimatedBudget.toString() : '',
			description     : props.load ? props.load.description : '',
			createdAt       : props.load ? moment(props.load.createdAt) : moment(),
			calenderFocused : false,
			error           : ''
		};
	}

	onFromChange = (e) => {
		const from = e.target.value;
		this.setState(() => ({ from }));
	};
	onToChange = (e) => {
		const to = e.target.value;
		this.setState(() => ({ to }));
	};

	onEstimatedWeightChange = (e) => {
		const estimatedWeight = e.target.value;
		this.setState(() => ({ estimatedWeight }));
	};

	onEstimatedBudgetChange = (e) => {
		const estimatedBudget = e.target.value;

		if (!estimatedBudget || estimatedBudget.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({ estimatedBudget }));
		}
	};
	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};
	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calenderFocused: focused }));
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.from || !this.state.from || !this.state.estimatedWeight || !this.state.estimatedBudget) {
			this.setState(() => ({ error: 'Please provide information in all the boxes' }));
		}
		else {
			this.setState(() => ({ error: '' }));
			this.props.onSubmit({
				to              : this.state.to,
				from            : this.state.from,
				estimatedWeight : this.state.estimatedWeight,
				estimatedBudget : parseFloat(this.state.estimatedBudget, 10),
				description     : this.state.description,
				createdAt       : this.state.createdAt.valueOf()
			});
		}
	};

	render() {
		return (
			<div>
				<div className='content-wrapper'>
					{this.state.error && <p>{this.state.error}</p>}
					<form onSubmit={this.onSubmit}>
						<div className='row gutters'>
							<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
								<div className='card'>
									<div className='card-body'>
										<div className='row gutters'>
											<div className='col-xl-6 col-lglg-6 col-md-6 col-sm-6 col-12'>
												<div className='form-group'>
													<label htmlFor='from'>From</label>
													<input
														type='text'
														className='form-control'
														name='from'
														id='from'
														autoFocus
														placeholder='Location'
														value={this.state.from}
														onChange={this.onFromChange}
													/>
												</div>
											</div>
											<div className='col-xl-6 col-lglg-6 col-md-6 col-sm-6 col-12'>
												<div className='form-group'>
													<label htmlFor='to'>To</label>
													<input
														type='text'
														className='form-control'
														name='to'
														id='to'
														placeholder='Enter the Destination'
														value={this.state.to}
														onChange={this.onToChange}
													/>
												</div>
											</div>
											<div className='col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12'>
												<div className='form-group'>
													<label htmlFor='estimatedWeight'>Estimated Weight</label>
													<input
														type='text'
														className='form-control'
														name='estimatedWeight'
														id='estimatedWeight'
														placeholder='Estimated Weight'
														value={this.state.estimatedWeight}
														onChange={this.onEstimatedWeightChange}
													/>
												</div>
											</div>
											<div className='col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12'>
												<div className='form-group'>
													<label htmlFor='estimatedBudget'>Estimated Budget</label>
													<input
														type='text'
														className='form-control'
														name='estimatedBudget'
														id='estimatedBudget'
														placeholder='Budget'
														value={this.state.estimatedBudget}
														onChange={this.onEstimatedBudgetChange}
													/>
												</div>
											</div>
											<div className='col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12'>
												<div className='form-group'>
													<label htmlFor='estimatedBudget'>Transportation Date</label>
													<div />
													<SingleDatePicker
														date={this.state.createdAt} // momentPropTypes.momentObj or null
														onDateChange={this.onDateChange} // PropTypes.func.isRequired
														focused={this.state.calenderFocused} // PropTypes.bool
														onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
														numberOfMonths={1}
													/>
												</div>
											</div>
											<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
												<div className='form-group'>
													<label htmlFor='description'>Load Description</label>
													<textarea
														className='form-control'
														name='description'
														id='description'
														rows='3'
														placeholder='Short Description e.g I need 100 pockets of potatoes to be transported in 2days time'
														value={this.state.description}
														onChange={this.onDescriptionChange}
													/>
												</div>
											</div>
										</div>
										<button type='submit' className='btn btn-primary mb-2'>
											Submit{' '}
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default LoadForm;
