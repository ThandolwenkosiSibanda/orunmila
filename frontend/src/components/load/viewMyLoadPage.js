import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyLoad } from '../../actions/myLoads';
import MyLoadCard from './myLoadCard';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';

class ViewMyLoadPage extends Component {
	constructor(props) {
		super(props);
		// ({ dispatch, id, from, to, estimatedWeight, estimatedBudget, description })
		this.state = {
			IsOpen : false,
			loadId : ''
		};
	}

	showModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;
		this.setState({ IsOpen: true, loadId: id });
	};

	hideModal = () => {
		this.setState({ IsOpen: false, loadId: '' });
	};

	componentDidMount() {
		this.props.fetchMyLoad(this.props.match.params.loadId);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentUserId !== this.props.currentUserId) {
			this.props.fetchMyLoad(this.props.match.params.loadId);
		}
	}

	renderComponentDetails = () => {
		if (!this.props.load) {
			return <div>Loading</div>;
		}

		return (
			<React.Fragment>
				<div className='page-header'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item active' />
					</ol>
				</div>

				<div className='content-wrapper'>
					<div className='row'>
						<MyLoadCard {...this.props.load} />
						<div className='col-xl-3 col-lg-3 col-md-3 col-sm-12'>
							<div className='card'>
								<div className='card-body'>
									<h6>Activity On This Load</h6>
									<div className='divider' />
									<p>
										<strong>Proposals : </strong>20{' '}
									</p>
									<p>
										<strong>Interviewing : </strong> 5
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
					<ModalHeader>Reject Proposal</ModalHeader>
					<ModalBody>
						<form onSubmit={this.onSubmit}>
							<div className='row'>
								<div className='col-sm-12'>
									<h5>Are You Sure You Want To Delete This Load </h5>
								</div>
							</div>

							<div className='modal-footer custom'>
								<button type='button' className='btn btn-link danger' onClick={this.hideModal}>
									Cancel
								</button>

								<button type='submit' className='btn btn-link success '>
									Confirm
								</button>
							</div>
						</form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state, OwnProps) => {
	return {
		load          : state.myloads[OwnProps.match.params.loadId],
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { fetchMyLoad })(ViewMyLoadPage);
