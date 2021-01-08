import React from 'react';
import { Link } from 'react-router-dom';
import OfferList from './offerList';

import { connect } from 'react-redux';



const OffersDashboardPage = (props)=> {


	return (
		<div className='main-container'>
			<div className='page-header'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item active'>Offers</li>
				</ol>
			</div>

			<div className='content-wrapper'>
				<div className='row gutters'>
					<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
						<OfferList />
					</div>
				</div>
			</div>
		</div>
	);

}

// class OffersDashboardPage extends React.Component {

// 	renderComponentDetails = () => {
// 		return (
// 			<div className='main-container'>
// 				<div className='page-header'>
// 					<ol className='breadcrumb'>
// 						<li className='breadcrumb-item active'>Offers</li>
// 					</ol>
// 				</div>

// 				<div className='content-wrapper'>
// 					<div className='row gutters'>
// 						<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
// 							<OfferList />
// 						</div>
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
		isSignedIn : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps)(OffersDashboardPage);
