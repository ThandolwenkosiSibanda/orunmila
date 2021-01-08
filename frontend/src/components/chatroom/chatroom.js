import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

// import 'bootstrap/dist/css/bootstrap.min.css';

import MessagesList from './messagesList';
import { fetchMessages, addMessage, updateChatroomMessages } from '../../actions/messages';
import { addOffer } from '../../actions/offer';
import { updateChatroom, fetchChatrooms, fetchChatroom } from '../../actions/chatrooms';
import ChatForm from './chatForm';
import OfferModalForm from './offerModalForm';
import { connect } from 'react-redux';
import socket from '../../apis/socket';
import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';
import _ from 'lodash';

import {
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED,
	MESSAGE_RECEIVED,
	TYPING,
	VERIFY_USER,
	JOIN_CHATROOM,
	LOGOUT
} from '../../socketEvents';

class Chatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			IsOpen : false,
			typingStatus:false,
			typingUser:false
		};
	}

	componentDidMount() {
		appendScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
		appendScript('../../js/slimscroll.min.js');
		appendScript('../../js/custom-scrollbar.js');
		appendScript('../../js/main.js');
		appendScript('../../js/moment.js');
		const { activeChatroom } = this.props;
		// {activeChatroom.messages ? <MessagesList messages={activeChatroom.messages} /> : ''}

		socket.on(MESSAGE_RECEIVED, (message) => {
			// this.props.addMessage(message);
			// console.log('refresh the messages');

			this.scrollToBottom();

			this.props.fetchChatrooms();
			console.log(message);
		});



		
		this.props.fetchChatrooms();
		this.scrollToBottom();
	}

	componentWillUnmount() {
		removeScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
		removeScript('../../js/slimscroll.min.js');
		removeScript('../../js/custom-scrollbar.js');
		removeScript('../../js/main.js');
		removeScript('../../js/moment.js');
	}

	componentDidUpdate(prevProps) {
		appendScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
		appendScript('../../js/slimscroll.min.js');
		appendScript('../../js/custom-scrollbar.js');
		appendScript('../../js/main.js');
		appendScript('../../js/moment.js');
		const chatroomId = this.props.activeChatroom ? this.props.activeChatroom._id : {};
		const userId = this.props.currentUserId ? this.props.currentUserId : {};
		const { activeChatroom = {} } = prevProps;
		if (chatroomId !== activeChatroom._id && _.isEmpty(chatroomId) !== true && _.isEmpty(userId) !== true) {
			this.props.fetchChatrooms();
			// this.props.fetchMessages(chatroomId);
			// console.log(chatroomId);
			// this.props.fetchChatroom(chatroomId);

			/**
			 * Request to join a chatroom
			 * Will do basic checks later to determine if the user should be allowed to join the room
			 * Provide the Chatroom Id and the user Id to the Join Chatroom Request
			 */
			socket.emit(JOIN_CHATROOM, { chatroomId, userId });

			/**
			 * Listen to changes in the chatroom
			 * Its possible to now listen to the changes in the chatroom is you have been successfully added to the chatroom
			 */
			socket.on(TYPING, (TypingUserId) => {
				// console.log('Chatroom', chatroom[0].messages);
				// // console.log(_.keyBy(chatroom[0].messages, '_id'));
				
				this.setState({ typingStatus: true });
				this.setState({ typingUser: TypingUserId });

this.TypingTimer();
			

			
			});

			// io.to(chatroomId).emit('welcome', (message) => {
			// 	console.log(message);
			// });
		}
		// this.props.fetchMessages(chatroomId);

		this.scrollToBottom();
	}




	 TypingTimer=()=> {
		setTimeout(this.resetTypingStatus, 4000);
	}
	resetTypingStatus=()=> {
		this.setState({ typingStatus: false });
		this.setState({ typingUser: false });
	}

	onSubmit = (formValues) => {
		const { activeChatroom } = this.props;
		const { currentUserId } = this.props;

		// remember to remove add message
		// this.props.updateChatroomMessages({ ...formValues, activeChatroom, currentUserId });

		socket.emit(MESSAGE_SENT, { ...formValues, activeChatroom, currentUserId });

		this.scrollToBottom();
	};

	onSubmitOffer = (formValues) => {
		const transporter = this.props.activeChatroom.transporter._id;
		const load = this.props.activeChatroom.load;
		const proposal = this.props.activeChatroom.proposal;

		this.props.addOffer({ ...formValues, transporter, load, proposal });
	};

	showModal = () => {
		this.setState({ IsOpen: true });
	};

	hideModal = () => {
		this.setState({ IsOpen: false });
	};

	onTyping = (formValues) => {
		// socket.on(TYPING, (message) => {


		// 	console.log('message', message);
		
		// 	return <div className="typing">Typing ...</div>;
		// });
		// socket.emit('Typing', formValues);
	};

	renderChatroomHeader = () => {
		if (this.props.activeChatroom && this.props.activeChatroom.client._id === this.props.currentUserId) {
			return (
				<div className="active-user-info">
					<img
						className="avatar"
						src={this.props.activeChatroom ? `/images/${this.props.activeChatroom.transporter.avatar}` : ''}
						alt={this.props.userName}
					/>
					<div className="avatar-info">
						<h5>{this.props.activeChatroom ? this.props.activeChatroom.transporter.name : ''}</h5>
						{this.onTyping()}
						{this.state.typingStatus && this.state.typingUser !== this.props.currentUserId ? <div className='typing'>Typing ...</div>: ''}
					</div>
				</div>
			);
		} else {
			return (
				<div className="active-user-info">
					<img
						className="avatar"
						src={this.props.activeChatroom ? `/images/${this.props.activeChatroom.client.avatar}` : ''}
						alt={this.props.userName}
					/>
					<div className="avatar-info">
					
						<h5>{this.props.activeChatroom ? this.props.activeChatroom.client.name : ''}</h5>
						{this.onTyping()}
						{this.state.typingStatus && this.state.typingUser !== this.props.currentUserId ? <div className='typing'>Typing ...</div>: ''}

						
					</div>
				</div>
			);
		}
	};

	scrollToBottom = () => {

		// console.log('message end', this.messagesEnd.scrollTop);
		// console.log('message height', this.messagesEnd.scrollHeight);

		if(this.messagesEnd){
			this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
		}
		
	};

	renderComponentDetails = () => {
		const { messages } = this.props;

		const { activeChatroom } = this.props;

		if (activeChatroom && activeChatroom.messages) {
			return (
				<React.Fragment>
					<div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
						<div className="active-user-chatting">
							{this.renderChatroomHeader()}

							<div className="chat-actions">
								{activeChatroom.client._id === this.props.currentUserId ? (
									<button className="btn btn-outline-info" onClick={this.showModal}>
										Make Offer
									</button>
								) : (
									''
								)}

								<button className="btn btn-outline-danger m-2">Block </button>
							</div>
						</div>
						<div className="chat-container">
							<div
								className="chatContainerScroll"
								ref={(el) => {
									this.messagesEnd = el;
								}}
							>
								{activeChatroom ? <MessagesList {...activeChatroom} /> : ''}
							</div>

							<div
								className="chat-form"
								ref={(el) => {
									this.chatform = el;
								}}
							>
								<ChatForm onSubmit={this.onSubmit} activechatroom = {this.props.activeChatroom} />
							</div>
						</div>
					</div>

					<Modal show={this.state.IsOpen} onHide={this.hideModal}>
						<OfferModalForm onSubmitOffer={this.onSubmitOffer} hideModal={this.hideModal} />
					</Modal>
				</React.Fragment>
			);
		}
		return (
			<div className="col-xl-9 col-lg-9 col-md-8 col-sm-10 col-9">
				<div className="chat-container">
					<div
						className="chatContainerScroll"
						ref={(el) => {
							this.messagesEnd = el;
						}}
					/>

					<div
						className="chat-form"
						ref={(el) => {
							this.chatform = el;
						}}
					/>
				</div>
			</div>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentUserId     : state.auth.userId,
		messages          : _.toArray(state.messages),
		activeChatroom    : ownProps.activeChatroom,
		currentUserAvatar : state.auth.userAvatar
	};
};

export default connect(mapStateToProps, {
	fetchMessages,
	addMessage,
	updateChatroom,
	fetchChatrooms,
	fetchChatroom,
	updateChatroomMessages,
	addOffer
})(Chatroom);
