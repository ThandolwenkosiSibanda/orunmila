import React, { Component, useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';

// import 'bootstrap/dist/css/bootstrap.min.css';

import MessagesList from './messagesList';
import { fetchMessages, addMessage, updateChatroomMessages } from '../../actions/messages';
import { addOffer } from '../../actions/offer';
import { updateChatroom, fetchChatrooms, fetchChatroom } from '../../actions/chatrooms';
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import ChatForm from './chatForm';
import OfferModalForm from './offerModalForm';
import { connect } from 'react-redux';
import socket from '../../apis/socket';
import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';
import axios from '../../apis/backend';
import _ from 'lodash';
import Pusher from 'pusher-js';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './chatroomF.css';

import history from '../../history';

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

const Chatroom = (props) => {
	const lastMessageRef = useRef();
	const chatroomId = props.activeChatroom ? props.activeChatroom._id : '';
	const [ messages, setMessages ] = useState([]);
	const [ offers, setOffers ] = useState([]);
	const [ input, setInput ] = useState('');
	const [ isButtonDisabled, setisButtonDisabled ] = useState(false);
	const [ IsOpen, setIsOpen ] = useState(false);

	useEffect(
		() => {
			if (chatroomId) {
				axios.get(`/api/messages/${chatroomId}`).then((response) => {
					setMessages(response.data);
					scrollToBottom();
				});
			}
		},
		[ chatroomId ]
	);

	useEffect(
		() => {
			if (chatroomId) {
				axios.get(`/api/offers/${chatroomId}`).then((response) => {
					setOffers(response.data);
				});
			}
		},
		[ chatroomId ]
	);

	useEffect(
		() => {
			var pusher = new Pusher('3af11569f88118f97cfc', {
				cluster : 'ap2'
			});

			var channel = pusher.subscribe('messages');
			channel.bind('inserted', (newMessage) => {
				setMessages([ ...messages, newMessage ]);

				setInput('');
				setisButtonDisabled(false);
				scrollToBottom();
			});
			return () => {
				channel.unbind_all();
				channel.unsubscribe();
			};
		},
		[ messages, chatroomId ]
	);

	const sendMessage = async (e) => {
		e.preventDefault();
		setInput('....Sending Message');
		setisButtonDisabled(true);

		await axios.post('/api/messages', {
			content  : input,
			chatroom : chatroomId
		});

		scrollToBottom();
	};

	const scrollToBottom = () => {
		return lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	const onSubmitOffer = (formValues) => {
		hideModal();
		const transporter = props.activeChatroom.transporter._id;
		const load = props.activeChatroom.load;
		const proposal = props.activeChatroom.proposal;
		const chatroom = props.activeChatroom._id;

		if (offers.length < 1) {
			props.addOffer({ ...formValues, transporter, load, proposal, chatroom });
		}
	};

	const checkOffer = () => {
		const activeOffer = offers.filter((offer) => {
			return offer.status === 'Active';
		});

		if (
			activeOffer.length < 0 &&
			(props.activeChatroom && props.activeChatroom.client._id === props.currentUserId)
		) {
			return (
				<button className="btn btn-outline-info" onClick={showModal}>
					Make Offer
				</button>
			);
		} else if (
			activeOffer.length > 0 &&
			(props.activeChatroom && props.activeChatroom.client._id === props.currentUserId)
		) {
			return (
				<button
					className="btn btn-outline-info"
					onClick={() => {
						return history.push('/offers');
					}}
				>
					View Offer
				</button>
			);
		} else if (
			activeOffer.length > 0 &&
			(props.activeChatroom && props.activeChatroom.transporter._id === props.currentUserId)
		) {
			return (
				<button
					className="btn btn-outline-info"
					onClick={() => {
						return history.push('/offers');
					}}
				>
					View Offer
				</button>
			);
		}
	};

	const renderChatroomHeader = () => {
		if (props.activeChatroom && props.activeChatroom.client._id === props.currentUserId) {
			return (
				<div className="active-user-info">
					<img
						className="avatar"
						src={props.activeChatroom ? `/images/${props.activeChatroom.transporter.avatar}` : ''}
						alt={props.userName}
					/>
					<div className="avatar-info">
						<h5>{props.activeChatroom ? props.activeChatroom.transporter.name : ''}</h5>
					</div>
				</div>
			);
		} else if (props.activeChatroom && props.activeChatroom.transporter._id === props.currentUserId) {
			return (
				<div className="active-user-info">
					<img
						className="avatar"
						src={props.activeChatroom ? `/images/${props.activeChatroom.client.avatar}` : ''}
						alt={props.userName}
					/>
					<div className="avatar-info">
						<h5>{props.activeChatroom ? props.activeChatroom.client.name : ''}</h5>
					</div>
				</div>
			);
		}
	};

	return (
		<div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
			<div className="active-user-chatting">
				{renderChatroomHeader()}
				<div className="chat-actions">{checkOffer()}</div>
			</div>

			<div className="chat-container">
				<div className="chatContainerScroll">
					<ul id="chat-box" className="chat-box">
						{messages.map((message) => (
							<li
								className={
									props.currentUserId === (message.user._id || message.user) ? (
										'chat-right'
									) : (
										'chat-left '
									)
								}
								key={message._id}
							>
								<div className="chat-text">
									<p>{message.content} </p>
									<div className="chat-hour">
										<span className="icon-done_all" />
									</div>
								</div>
								<div className="chat-avatar">
									<img src={''} alt="" />
									<div className="chat-name">{message.user.name}</div>
								</div>
							</li>
						))}
						<div ref={lastMessageRef} />
					</ul>
				</div>

				<div className="chat-form">
					<div className="form-group">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="form-control"
							placeholder="Type your message here..."
						/>
						<button
							className="btn btn-primary"
							onClick={sendMessage}
							disabled={input.length < 2 ? 'disabled' : isButtonDisabled}
						>
							<PlayArrowIcon />
						</button>
					</div>
				</div>

				<Modal show={IsOpen} onHide={hideModal}>
					<OfferModalForm onSubmitOffer={onSubmitOffer} hideModal={hideModal} />
				</Modal>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		currentUserId     : state.auth.userId,
		currentUser       : state.auth,
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
