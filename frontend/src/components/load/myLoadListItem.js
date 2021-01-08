import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import MyLoadActionModalForm from './myLoadActionModalForm';

const MyLoadListItem = (props) => {
	const [ IsOpen, setIsOpen ] = useState(false);
	const [ LoadId, setLoadId ] = useState('');
	const [ Content, setContent ] = useState('');

	useEffect(
		() => {
			let isSubscribed = true;

			try {
				// props.fetchCreditsTotal();
			} catch (error) {
				console.log('There was an error', error);
			}
			return () => (isSubscribed = false);
		},
		[ props.status ]
	);

	const showModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;
		setIsOpen(true);
		setContent(e.target.value);
	};

	const hideModal = () => {
		setIsOpen(false);
		setContent('');
	};

	const onCloseLoad = () => {
		const loadId = props._id;
		props.onCloseLoad(loadId);
		hideModal();
	};

	return (
		<React.Fragment>
			<div className="task-block card">
				<div className="task-details">
					<Link to={`/myloads/${props._id}`}>
						<div className="task-name">
							{props.from} - {props.to}
						</div>

						<div className="task-desc">{props.description}</div>
						<div className="task-types">
							<span>
								<strong>Estimated Budget</strong> : {props.budget} {props.currency}
							</span>&nbsp;&nbsp;
							<span>
								<strong>Estimated Weight</strong> : {props.weight} {props.weightUnit}
							</span>&nbsp;&nbsp;
							<span>
								<strong>Posted</strong> {moment(props.createdAt).fromNow()}
							</span>
						</div>
					</Link>
				</div>

				{props.status === 'active' ? (
					<div className="chat-actions">
						<button className="btn btn-outline-danger m-2" value="Close Load" onClick={showModal}>
							Close Load
						</button>
					</div>
				) : (
					''
				)}
			</div>

			<Modal show={IsOpen} onHide={hideModal}>
				<MyLoadActionModalForm
					onSubmit={Content === 'Close Load' ? onCloseLoad : hideModal}
					onHide={hideModal}
					content={Content}
				/>
			</Modal>
		</React.Fragment>
	);
};

// class MyLoadListItem extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			IsOpen  : false,
// 			content : ''
// 		};
// 	}
// 	showModal = (e) => {
// 		this.setState({ IsOpen: true, content: e.target.value });
// 	};

// 	hideModal = () => {
// 		this.setState({ IsOpen: false, content: '' });
// 	};

// 	onCloseLoad = () => {
// 		const loadId = this.props._id;
// 		this.props.onCloseLoad(loadId);
// 		this.hideModal();
// 	};

// 	renderComponentDetails = () => {
// 		return (
// 			<React.Fragment>
// 				<div className="task-block card">
// 					<div className="task-details">
// 						<Link to={`/myloads/${this.props._id}`}>
// 							<div className="task-name">
// 								{this.props.from} - {this.props.to}
// 							</div>

// 							<div className="task-desc">{this.props.description}</div>
// 							<div className="task-types">
// 								<span>
// 									<strong>Estimated Budget</strong> :{this.props.budget}
// 								</span>&nbsp;&nbsp;
// 								<span>
// 									<strong>Estimated Weight</strong> :{this.props.weight}
// 								</span>&nbsp;&nbsp;
// 								<span>
// 									<strong>Posted</strong> {moment(this.props.createdAt).fromNow()}
// 								</span>
// 							</div>
// 						</Link>
// 					</div>

// 					{this.props.status === 'active' ? (
// 						<div className="chat-actions">
// 							<button className="btn btn-outline-danger m-2" value="Close Load" onClick={this.showModal}>
// 								Close Load
// 							</button>
// 						</div>
// 					) : (
// 						''
// 					)}
// 				</div>

// 				<Modal show={this.state.IsOpen} onHide={this.hideModal}>
// 					<MyLoadActionModalForm
// 						onSubmit={this.state.content === 'Close Load' ? this.onCloseLoad : this.hideModal}
// 						onHide={this.hideModal}
// 						content={this.state.content}
// 					/>
// 				</Modal>
// 			</React.Fragment>
// 		);
// 	};

// 	render() {
// 		return this.renderComponentDetails();
// 	}
// }

export default MyLoadListItem;
