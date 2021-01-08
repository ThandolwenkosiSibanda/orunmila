import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { fetchLoad, deleteLoad } from '../../actions/loads';
import _ from 'lodash';

import LoadForm from './loadForm';
import Modal from '../../modal';

/**
 * 
 * React.Fragment used
 * Its like a div but does not affect the dom and does not show up
 */


const DeleteLoadPage = (props)=> {

	useEffect(() => {
		let isSubscribed = true;
		props.fetchLoad(props.match.params.id);  
        return () => (isSubscribed = false);
    
	}, [])	



	const renderActions = () => {
		return (
			<React.Fragment>
				<button
					onClick={() => props.deleteLoad(props.match.params.id)}
					type='button'
					className='btn btn-secondary'
					data-dismiss='modal'
				>
					Delete
				</button>
				<Link to='/loads' type='button' className='btn btn-primary'>
					Cancel
				</Link>
			</React.Fragment>
		);
	};

	const renderContent = () => {
		if (!props.load) {
			return 'Are you sure you want to delete this load';
		}

		return `Are you sure you want to delete this load: ${props.load.from} to ${props.load.to}`;
	};

	const onDismiss = () => {
		return history.push('/');
	};


	return (
		<div>
			<div className='page-header'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item active'>Delete Load {props.match.params.id}</li>
				</ol>
			</div>

			<Modal
				title='Delete Load'
				content={renderContent()}
				actions={renderActions()}
				onDismiss={onDismiss}
			/>
		</div>
	);



}
// class DeleteLoadPage extends React.Component {
// 	renderActions = () => {
// 		return (
// 			<React.Fragment>
// 				<button
// 					onClick={() => this.props.deleteLoad(this.props.match.params.id)}
// 					type='button'
// 					className='btn btn-secondary'
// 					data-dismiss='modal'
// 				>
// 					Delete
// 				</button>
// 				<Link to='/loads' type='button' className='btn btn-primary'>
// 					Cancel
// 				</Link>
// 			</React.Fragment>
// 		);
// 	};

// 	renderContent = () => {
// 		if (!this.props.load) {
// 			return 'Are you sure you want to delete this load';
// 		}

// 		return `Are you sure you want to delete this load: ${this.props.load.from} to ${this.props.load.to}`;
// 	};

// 	onDismiss = () => {
// 		return history.push('/');
// 	};

// 	componentDidMount() {
// 		this.props.fetchLoad(this.props.match.params.id); 
// 	}

// 	renderComponentDetails = () => {
// 		return (
// 			<div>
// 				<div className='page-header'>
// 					<ol className='breadcrumb'>
// 						<li className='breadcrumb-item active'>Delete Load {this.props.match.params.id}</li>
// 					</ol>
// 				</div>

// 				<Modal
// 					title='Delete Load'
// 					content={this.renderContent()}
// 					actions={this.renderActions()}
// 					onDismiss={this.onDismiss}
// 				/>
// 			</div>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

const mapStateToProps = (state, ownProps) => {
	return {
		load : state.loads[ownProps.match.params.id]
	};
};

export default connect(mapStateToProps, { fetchLoad, deleteLoad })(DeleteLoadPage);
