import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../apis/socket';
import _ from 'lodash';
import { fetchChatrooms } from '../../actions/chatrooms';

import { addSocket, fetchSocket } from '../../actions/sockets';

import ChatroomsList from './chatroomsList';
import ChatroomsSearch from './chatroomsSearch';
import { appendScript } from '../../utils/appendScript';
import { removeScript } from '../../utils/removeScript';
import $ from 'jquery';
import '../../loader';

import Chatroom from './chatroomF';
import {
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED,
	MESSAGE_RECEIVED,
	TYPING,
	VERIFY_USER,
	LOGOUT
} from '../../socketEvents';

class ChatroomPage extends React.Component {
	componentDidMount() {
		this.initSocket();
		appendScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
		appendScript('../../js/slimscroll.min.js');
		appendScript('../../js/custom-scrollbar.js');
		appendScript('../../js/main.js');
		appendScript('../../js/moment.js');
	}

	componentWillUnmount() {
		removeScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
		removeScript('../../js/slimscroll.min.js');
		removeScript('../../js/custom-scrollbar.js');
		removeScript('../../js/main.js');
		removeScript('../../js/moment.js');
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentUserId !== this.props.currentUserId) {
			this.props.fetchChatrooms();
		}
	}

	/**
	 * This is where we update the state of the socket
	 * Since we are using redux-> We need to call the action creator from here
	 * Then the action creator will update our Redux Store
	 */
	initSocket = () => {
		socket.on('connect', () => {
			// console.log('connected');
		});
		this.props.addSocket(socket);
	};

	/**
 * Sets the user property in state
 */

	renderComponentDetails = () => {
		const { chatrooms, activeChatroom } = this.props;

		return (
			<React.Fragment>
				<div className="page-header">
					<ol className="breadcrumb">
						<li className="breadcrumb-item active">Messages</li>
					</ol>
				</div>

				<div className="content-wrapper">
					<div className="chat-section">
						<div className="row ">
							<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 d-none d-lg-block ">
								<div className="users-container">
									<ChatroomsSearch />
									<div className="usersContainerScroll">
										<ChatroomsList />
									</div>
								</div>
							</div>

							<Chatroom {...chatrooms} activeChatroom={activeChatroom} />
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

const mapStateToprops = (state, ownProps) => {
	return {
		currentUserId  : state.auth.userId,
		chatrooms      : _.toArray(state.chatrooms),
		activeChatroom : state.chatrooms[ownProps.match.params.id]
	};
};

export default connect(mapStateToprops, { fetchChatrooms, addSocket, fetchSocket })(ChatroomPage);
