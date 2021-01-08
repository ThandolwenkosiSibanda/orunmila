import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './loadSearchInput.css';

const LoadsSearchInput = (props) => {
	const [ searchTerm, setSearchTerm ] = useState('');

	const handlePageChange = (e, value) => {};

	return (
		<div className="card">
			<div className="row">
				<div className="col-sm-10 search-input">
					<input
						type="text"
						className="form-control"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
					/>
				</div>
				<div className="col-sm-2 search-btn-container">
					<button type="submit" className="btn btn-primary search-btn">
						Search
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		filters : state.loadsfilters
	};
};

export default connect(mapStateToProps)(LoadsSearchInput);
