import React, { Component } from 'react';
import MyLoadProposalsList from './myLoadProposalsList';
import moment from 'moment';

class MyLoadCard extends Component {
	renderComponentDetails = () => {
		if (!this.props) {
			return <div>Waiting</div>;
		}

		return (
			<div className='col-xl-9 col-lg-9 col-md-9 col-sm-12'>
				<div className='card'>
					<div className='card-header'>
						<div className='card-title'>
							<div className=''>
								<h5>
									Transporter: {this.props.from} - {this.props.to}
								</h5>
								<p className='divider' />
								<h6>{moment(this.props.createdAt).fromNow()}</h6>
							</div>
						</div>
					</div>
					<div className='card-body'>
						<p className='card-text'>This is my amazing Load</p>

						<div className='row'>
							<div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'>
								<div className=''>
									<div className='stats-detail'>
										<h6>{this.props.budget}</h6>
										<p>Fixed Price</p>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'>
								<div className=''>
									<div className='stats-detail'>
										<h6>{this.props.weight}</h6>
										<p>Estimated Weight</p>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'>
								<div className=''>
									<div className='stats-detail'>
										<h6>Contract Type: </h6>
										<p>One Time Delivery</p>
									</div>
								</div>
							</div>
						</div>

						<MyLoadProposalsList {...this.props} />
					</div>
				</div>
			</div>
		);
	};
	render() {
		return this.renderComponentDetails();
	}
}

export default MyLoadCard;
