import React from 'react';
import Skeleton from '@yisheng90/react-loading';

const proposalViewSpinner = () => {
	return (
		<React.Fragment>
			<div className="page-header">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active">
						<Skeleton width="20%" />
					</li>
				</ol>
			</div>

			<div className="content-wrapper">
				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
						<div className="card">
							<div className="card-header">
								<Skeleton width="20%" />
								<div className="card-title">
									<div className="">
										<p className="divider" />
										<h6>
											<Skeleton width="20%" />
										</h6>
									</div>
								</div>
							</div>
							<div className="card-body">
								<p className="card-text">
									<Skeleton width="50%" />
								</p>

								<div className="row">
									<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>
													<Skeleton width="50%" />
												</h6>
											</div>
										</div>
									</div>
								</div>
								<p className="divider" />
								<div className="row" />
							</div>
						</div>
					</div>

					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
						<div className="card">
							<div className="card-header">
								<Skeleton width="40%" />
								<div className="card-title">
									<div className="">
										<h6>
											<Skeleton width="20%" />
										</h6>
										<p className="divider" />
										<h6>
											<Skeleton width="50%" />
										</h6>
									</div>
								</div>
							</div>
							<div className="card-body">
								<p className="card-text">
									<Skeleton width="70%" />
								</p>

								<div className="row">
									<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>
													<Skeleton width="30%" />
												</h6>
												<Skeleton width="30%" />
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>
													<Skeleton width="30%" />
												</h6>
												<Skeleton width="30%" />
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
										<div className="">
											<div className="stats-detail">
												<h6>
													<Skeleton width="20%" />
												</h6>
												<Skeleton width="30%" />
											</div>
										</div>
									</div>
								</div>
								<p className="divider" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default proposalViewSpinner;
