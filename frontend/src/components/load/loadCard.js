import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

class LoadCard extends React.Component {
	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<div className="row ">
					<div className="col-xl-9 col-lg-9 col-md-9 col-sm-12">
						<div className="card">
							<div className="card-header">
								<div className="card-title">
									<div className="">
										{console.log(this.props)}
										<h5>
											Transporter: {this.props.from} - {this.props.to}
										</h5>
										<p className="divider" />
										<h6>Posted : {moment(this.props.createdAt).fromNow()}</h6>
									</div>
								</div>
							</div>
							<div className="card-body">
								<p className="card-text">{this.props.description}</p>

								<div className="row">
									<div className="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>{this.props.budget}</h6>
												<p>Fixed Price</p>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>{this.props.weight}</h6>
												<p>Estimated Weight</p>
											</div>
										</div>
									</div>
								</div>
								<p className="divider" />
								<h6>Contract Type: </h6>
								<p>One Time Delivery</p>
								<p className="divider" />
								<h6>About The Client</h6>
								<p>
									<strong>Payment Method : </strong> &nbsp; Verified &nbsp;&nbsp;{' '}
								</p>
								<p>
									<strong>Rating : </strong> <span className="icon-star" />
									<span className="icon-star" />
									<span className="icon-star" /> &nbsp;&nbsp;{' '}
								</p>
								<p>
									<strong>Location : </strong> &nbsp;Bulawayo
								</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
						<div className="card">
							<div className="card-body">
								<Link to={`/proposals/new/${this.props._id}`} className="btn btn-primary mb-1">
									Apply For Load
								</Link>
								<p>
									<strong>Required Credits</strong> : 1{' '}
								</p>
								<p>
									<strong>Available Credits</strong> : 10<span />
								</p>&nbsp;&nbsp;
								<div className="divider" />
								<h6>Activity On This Load</h6>
								<p>
									<strong>Proposals : </strong>Less than 5
								</p>
								<p>
									<strong>Interviewing : </strong> 5
								</p>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

export default connect()(LoadCard);
