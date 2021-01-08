import React, { Component } from 'react';
import io from 'socket.io-client';
import { reduxForm, Field } from 'redux-form';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
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
class ChatForm extends Component {

	constructor(props) {
		super(props);
	  
		this.state = {
			socket:null,
			user:null
		};
	  }

	componentDidMount() {
		this.initSocket();

	}

	initSocket = () => {
		const {currentUserId} = this.props;
		const socket = io(socketUrl, { query: `currentUserId=${currentUserId}` })
		
		if(currentUserId){
		
			this.setState({socket})


		}

	};







	componentDidUpdate(prevProps) {
		if (prevProps.currentUserId !== this.props.currentUserId) {
			this.initSocket();
		}
	}


	sendTyping = () => {
		const { socket } = this.state;
		const {activechatroom} = this.props;
		const {currentUserId} = this.props;
		const isTyping = "Typing";
		socket.emit(TYPING, activechatroom, currentUserId);
	};


	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <p style={{ color: 'red' }}>*{error}</p>;
		} else {
		}
	};

	renderTextArea = ({ input, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className="form-group">
				<textarea {...input} className={className} placeholder="Type your message here..." onKeyUp= {this.sendTyping}/>
				<button type="submit" className="btn btn-primary">
					<i className="icon-send" />
				</button>
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.dispatch(reset('addNewMessage'));
		this.props.onSubmit(formValues);
	};


	typing =(e)=>{
		console.log('Typing');
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name="message" component={this.renderTextArea}  />
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.message) {
		errors.message = 'Please enter a Message';
	}
	return errors;
};

const formWrapped = reduxForm({
	form     : 'addNewMessage',
	validate : validate
})(ChatForm);

const mapStateToProps = (state) => {
	return {
		currentUserId : state.auth.userId
	};
};

export default connect(mapStateToProps)(formWrapped);
