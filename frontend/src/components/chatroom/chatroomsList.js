import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatroomListItem from './chatroomListItem';
import { updateChatroom, fetchChatrooms, fetchChatroom } from '../../actions/chatrooms';
import _ from 'lodash';

class ChatroomsList extends React.Component {
	componentDidMount() {
		this.props.fetchChatrooms();
	}

	renderComponentDetails = () => {
		if (!this.props) {
			return <div>Loading..</div>;
		}

		return (
			<ul className="users">
				{this.props.chatrooms.map((chatroom) => (
					<ChatroomListItem
						key={chatroom._id}
						{...chatroom}
						handleSelectChatroom={this.handleSelectChatroom}
					
					/>
				))}
			</ul>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state) => {
	return {
		chatrooms : _.toArray(state.chatrooms)
	};
};

export default connect(mapStateToProps, { fetchChatrooms })(ChatroomsList);
