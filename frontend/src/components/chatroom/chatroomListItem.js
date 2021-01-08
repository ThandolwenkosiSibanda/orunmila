import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import _ from "lodash";
import { connect } from 'react-redux';
import { fetchOnlineUsers } from '../../actions/onlineUsers';

const {
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED,
	MESSAGE_RECEIVED,
	TYPING,
	VERIFY_USER,
	LOGOUT,
	CREATE_CHATROOM,
	FOUND_CHATROOM,
	JOIN_CHATROOM,
	NEW_CHATROOM
} = require('../../socketEvents');


const socketUrl = process.env.NODE_ENV === 'production' ? window.location.hostname : 'http://localhost:4000/';
class ChatroomListItem extends Component {



checkIfUserOnline =(userId)=>{
	const {onlineUsers} = this.props;
	// console.log('online users list item', onlineUsers);
	if (onlineUsers.filter(user => user._id === userId).length > 0) {
		/* vendors contains the element we're looking for */
		return <span className='badge badge-primary'>Online</span>
	  }
	  else {
		return <span className='badge badge-danger'>Offline</span>
	  }
	
}






	renderComponentDetails() {
		if (this.props.transporter._id === this.props.currentUserId) {
			return (
				<Link to={`/chatrooms/rooms/${this.props._id}`}>
					<li className="person">
						<div className="user">
							<img src={this.props.client.avatar ? `/images/${this.props.client.avatar}` : ''} alt="" />
						</div>

						<p className="">
							<span className="name">{this.props.client.name} </span>
							<span className="name">{this.props.client.surname} </span>
							
						

						
					
							
							
						</p>
					</li>
				</Link>
			);
		}

		return (
			<Link to={`/chatrooms/rooms/${this.props._id}`}>
				<li className="person">
					<div className="user">
						<img
							src={this.props.transporter.avatar ? `/images/${this.props.transporter.avatar}` : ''}
							alt=""
						/>
					</div>

					<p className="">
						<span className="name">{this.props.transporter.name} </span>

						<span className="name">{this.props.transporter.surname} </span>

						
						
				
						
						
					
					</p>
				</li>
			</Link>
		);
	}

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToprops = (state) => {
	return { currentUserId: state.auth.userId,
		     currentUserAvatar: state.auth.userAvatar,
		    onlineUsers  : _.toArray(state.onlineUsers) };
};
export default connect(mapStateToprops, {fetchOnlineUsers})(ChatroomListItem);
