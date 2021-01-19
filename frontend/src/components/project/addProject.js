import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './reviewForm';

// The purpose of the connect wrapper is to communicate with the provider in order to get the store

const AddProject = (props) => {
	return (
		<div>
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">Add New Project</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<ReviewForm onSubmit={onSubmit} />
			</div>
		</div>
	);
};

export default connect(null)(AddProject);
