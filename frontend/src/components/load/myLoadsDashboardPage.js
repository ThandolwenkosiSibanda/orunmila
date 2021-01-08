import React, { Component } from 'react';
import selectLoads from '../../selectors/loads';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';

import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';
import MyLoadsList from './myLoadsList';
import { fetchMyLoads } from '../../actions/myLoads';
import { addLoad } from '../../actions/loads';
import NewLoadForm from './loadForm';

class MyLoadsDashboardPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			IsOpen : false
		};
	}

	showModal = () => {
		this.setState({ IsOpen: true });
	};

	hideModal = () => {
		this.setState({ IsOpen: false });
	};
	onSubmit = (formValues) => {
		this.hideModal();
		this.props.addLoad(formValues);
	};
	renderCreateLoad = () => {
		if (this.props.isSignedIn) {
			return (
				<div className="row">
					<div className="col-sm-12">
						<button className="btn btn-primary float-right " onClick={this.showModal}>
							Post A New Load
						</button>
					</div>
				</div>
			);
		}
	};
	queryString() {
		let values = queryString.parse(this.props.queryString);

		if (values.status === undefined || values.status === null) {
			return 'active';
		}
		return values.status;
	}
	capitalise(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	renderComponentDetails = () => {
		return (
			<React.Fragment>
				<div className="page-header">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active">{this.capitalise(this.queryString())} Loads</li>
					</ol>
					{this.renderCreateLoad()}
				</div>

				<div className="content-wrapper">
					<div className="row gutters">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<MyLoadsList status={this.queryString()} />
						</div>
					</div>
				</div>

				<Modal show={this.state.IsOpen} onHide={this.hideModal} size="lg">
					<NewLoadForm onSubmit={this.onSubmit} onHide={this.hideModal} />
				</Modal>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}



const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn  : state.auth.isSignedIn,
		queryString : ownProps.location.search
	};
};

export default connect(mapStateToProps, { fetchMyLoads, addLoad })(MyLoadsDashboardPage);
