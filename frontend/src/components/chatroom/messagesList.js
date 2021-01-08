import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMessages } from '../../actions/messages';
import MessageListItem from './messageListItem';

class MessagesList extends Component {
	componentDidMount() {
		// console.log('Messages List');
	}

	componentDidUpdate(prevProps) {
		// const chatroomId = this.props.activeChatroom ? this.props.activeChatroom._id : {};
		// const { activeChatroom = {} } = prevProps;
		// if (chatroomId !== activeChatroom._id) {
		// 	this.props.fetchMessages(chatroomId);
		// }
		// console.log('updared');
		// const { messages } = this.props;
		// console.log(messages);
	}

	renderComponentDetails = () => {
		const { messages } = this.props;
		// console.log(messages);

		// console.log(this.props);

		// console.log(messages);
		if (!this.props.messages) {
			return (
				<ul>
					<li>Loading</li>
				</ul>
			);
		}
		return (
			<ul id='chat-box' className='chat-box'>
				{messages.map((message) => (
					<MessageListItem key={message._id} {...message} handleSelectMessage={this.handleSelectMessage} />
				))}
			</ul>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps, { fetchMessages })(MessagesList);
