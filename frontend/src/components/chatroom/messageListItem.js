import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class MessageListItem extends Component {
	renderComponentDetails = () => {
		// console.log('message Id', this.props.user._id);
		// console.log('User Id', this.props.currentUserId._id);
		if (this.props.user._id === this.props.currentUserId) {
			return (
				<li className="chat-right">
					<div className="chat-text">
						<p>{this.props.content}</p>
						<div className="chat-hour">
							{moment(this.props.createdAt).fromNow()}
							<span className="icon-done_all" />
						</div>
					</div>
					<div className="chat-avatar">
						<img
							src={this.props.currentUserAvatar ? `/images/${this.props.currentUserAvatar}` : ''}
							alt=""
						/>
						<div className="chat-name">{this.props.user.name}</div>
					</div>
				</li>
			);
		}

		return (
			<li className="chat-left">
				<div className="chat-text">
					<p>{this.props.content}</p>
					<div className="chat-hour">
						{moment(this.props.createdAt).fromNow()}
						<span className="icon-done_all" />
					</div>
				</div>
				<div className="chat-avatar">
					<img src={this.props.user.avatar ? `/images/${this.props.user.avatar}` : ''} alt="" />
					<div className="chat-name">{this.props.user.name}</div>
				</div>
			</li>
		);
	};

	render() {
		return this.renderComponentDetails();
	}
}

const mapStateToProps = (state) => {
	return { currentUserId: state.auth.userId, currentUserAvatar: state.auth.userAvatar };
};

export default connect(mapStateToProps)(MessageListItem);
