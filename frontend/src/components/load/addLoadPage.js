import React from 'react';
import { connect } from 'react-redux';
import LoadForm from './loadForm';
import { addLoad } from '../../actions/loads';

// The purpose of the connect wrapper is to communicate with the provider in order to get the store



const AddLoadPage = (props)=> {
	const onSubmit = (formValues) => {
		props.addLoad(formValues);
	};

	return (
		<div>
			<div className='page-header'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item active'>Add New Load</li>
				</ol>
			</div>

			<div className='content-wrapper'>
				<LoadForm onSubmit={onSubmit} />
			</div>
		</div>
	);

}	




// class AddLoadPage extends React.Component {
// 	onSubmit = (formValues) => {
// 		this.props.addLoad(formValues);
// 	};
// 	renderComponentDetails = () => {
// 		return (
// 			<div>
// 				<div className='page-header'>
// 					<ol className='breadcrumb'>
// 						<li className='breadcrumb-item active'>Add New Load</li>
// 					</ol>
// 				</div>

// 				<div className='content-wrapper'>
// 					<LoadForm onSubmit={this.onSubmit} />
// 				</div>
// 			</div>
// 		);
// 	};
// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

export default connect(null, { addLoad })(AddLoadPage);
