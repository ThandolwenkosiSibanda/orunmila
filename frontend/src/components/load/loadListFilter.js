import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { setLoadsTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/loadsFilters';

const LoadListFilters = (props) => {
	return (
		<div>
			<div className="row">
				<div className="col-sm-12">
					<input
						type="text"
						className="form-control"
						value={props.filters.text}
						onSubmit={(e) => {
							console.log(e.target.value);
						}}
						onChange={(e) => {
							props.dispatch(setLoadsTextFilter(e.target.value));
						}}
					/>
				</div>
			</div>
		</div>
	);
};

// class LoadListFilters extends React.Component {
// 	renderComponentDetails = () => {
// 		return (
// 			<div>
// 				<div className='row'>
// 					<div className='col-sm-12'>
// 						<input
// 							type='text'
// 							className='form-control'
// 							value={this.props.filters.text}
// 							onChange={(e) => {
// 								this.props.dispatch(setLoadsTextFilter(e.target.value));
// 							}}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const mapStateToProps = (state) => {
	return {
		filters : state.loadsfilters
	};
};

export default connect(mapStateToProps)(LoadListFilters);
