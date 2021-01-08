const io = require('./server.js').io;
const cookie    = require('cookie');
const session = require('express-session');
const _  = require('lodash');

const Credit = require('./models/credit'),
	Message = require('./models/message'),
	User  = require('./models/user'),
	Chatroom = require('./models/chatroom'),
	Load = require('./models/load');
Proposal = require('./models/proposal');

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
} = require('./SocketEvents');


let connectedUsers = {};
let previousConnectedUsers = connectedUsers;
let userSocketIdMap = new Map(); //a map of online usernames and their clients

module.exports = function(socket) {



	

	//User Connects with username
	socket.on(USER_CONNECTED, (user) => {


		
		user.socketId = socket.id;
const {currentUserId} = user;

User.findById(currentUserId)
	.exec(function(err, foundUser) {
		if (err) {
			console.log('chatrooms', err);;
		} else {


connectedUsers = addUser(connectedUsers, foundUser);


io.emit(USER_CONNECTED, connectedUsers);
		}
	});



	});



	/**
	* Listen to the Join Chatroom Event From the Client Side
	*/
	socket.on(JOIN_CHATROOM, ({ chatroomId, userId }) => {
		
		Chatroom.find({
			$or  : [ { client: userId }, { transporter: userId } ],
			$and : [ { _id: chatroomId } ]
		})
			.populate({ path: 'transporter', model: 'User' })
			.populate({ path: 'client', model: 'User' })
			.populate({ path: 'messages', model: 'Message' })
			.exec(function(err, foundChatroom) {
				if (err) {
					console.log('chatrooms', err);
				} else {
					socket.join(chatroomId);
					socket.emit('welcome', 'Welcome to the room');
					// io.in(chatroomId).emit('chatroom', foundChatroom);
					socket.emit('chatroom', foundChatroom);
					socket.emit('Typing', foundChatroom);
			
					io.in(foundChatroom._id).emit('Typing', 'Typing');
				}
			});

		/**
	   * Join the chatroom and pass the chatroomId into the socket
	   */
		// socket.join(chatroomId);
		/**
		 * Send a welcome message to the new user
		 */
		// socket.emit('welcome', 'Welcome to the room');
		/**
		* Send a message to the other people in the chatroom to alert them of the new user
	    */
		// socket.broadcast.to(chatroomId).emit('message', `${userId} joined the chatroom`);

		/**
		 * Handle the typing status
		 */
	});

	socket.on(TYPING, (chatroom, currentUserId) => {



		Chatroom.findById(chatroom._id, function(err, foundChatroom) {
			if (err) {
				console.log(err);
			} else {

				console.log(foundChatroom._id);
			io.in(foundChatroom._id).emit(TYPING, currentUserId);
			}

			
			
		});	


	});



	socket.on(MESSAGE_SENT, (messageContent) => {

		
		const message = {};
		message.user = messageContent.currentUserId;

		message.content = messageContent.message;
		message.chatroom = messageContent.activeChatroom._id;
		message.status = 'unread';

		Message.create(message, function(err, newMessage) {
			if (err) {
				res.send('Error');
			} else {
				Chatroom.findById(newMessage.chatroom, function(err, foundChatroom) {
					foundChatroom.messages.push(newMessage._id);
					foundChatroom.save(function(err, data) {
						if (err) {
							console.log(err);
						} else {
							// socket.join(message.chatroom);
							// io.emit(MESSAGE_RECEIVED, newMessage);
							io.in(newMessage.chatroom).emit(MESSAGE_RECEIVED, newMessage);

							// return res.json(newMessage);
						}
					});
				});
			}
		});
	});

	socket.on(CREATE_CHATROOM, (chatroom) => {
		Chatroom.findOne({
			$and : [
				{ load: chatroom.load },
				{ proposal: chatroom.proposal },
				{ transporter: chatroom.transporter },
				{ client: chatroom.client }
			]
		})
			.populate('load')
			.populate('proposal')
			.populate('transporter')
			.populate('client')
			.populate('messages')
			.exec(function(err, foundChatroom) {
				if (err) {
					// res.json(newChatroom);
					console.log(err);
				} else {
					if (foundChatroom == null) {
						Chatroom.create(chatroom, function(err, newChatroom) {
							if (err) {
								console.log(err);
							} else {
								socket.join(newChatroom._id);

								Chatroom.findById(newChatroom._id)
									.populate('load')
									.populate('proposal')
									.populate('transporter')
									.populate('client')
									.populate('messages')
									.exec(function(err, newChatroomFull) {
										if (err) {
											console.log('err');
										} else {
											io.in(newChatroom._id).emit(NEW_CHATROOM, newChatroomFull);
										}
									});
							}
						});
					} else {
						socket.join(foundChatroom._id);
						io.in(foundChatroom._id).emit(FOUND_CHATROOM, foundChatroom);
					}
				}
			});
	});


	socket.on('disconnect', () => {

		const currentUserId = socket.request._query['currentUserId'];
		

		if(currentUserId && currentUserId.length > 10 ){
			console.log('currentuserid', currentUserId);	
			
			User.findById(currentUserId)
			.exec(function(err, foundUser) {
				if (err) {
					console.log('chatrooms', err);;
				} else {
		
					
		connectedUsers = removeUser(connectedUsers, foundUser);
		
	io.emit(USER_DISCONNECTED, previousConnectedUsers, foundUser);
		// io.emit(USER_DISCONNECTED, connectedUsers);



		// removeClientFromMap(foundUser, socket.id);

		// console.log('map', userSocketIdMap);

		// console.log('====================================================');
		// addClientToMap(foundUser, socket.id);
		// console.log('map', userSocketIdMap);
		// console.log('socketId',socket.id);
		
		// io.emit(USER_CONNECTED, connectedUsers);
				}
			});			



		}
			

	});
};


/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user) {
	let newList = Object.assign({}, userList);
	newList[user._id] = user;
	return newList;
}


/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username) {
	let newList = Object.assign({}, userList);
	delete newList[username._id];
	return newList;
}




function addClientToMap(userName, socketId){
if (!userSocketIdMap.has(userName)) {
//when user is joining first time
userSocketIdMap.set(userName, new Set([socketId]));
} else{
//user had already joined from one client and now joining using another
client
userSocketIdMap.get(userName).add(socketId);
}
}


function removeClientFromMap(userName, socketId){

console.log('username', userName._id);
// console.log('usersockets', userSocketIdMap);

	if (userSocketIdMap.has(socketId)) {

		console.log('In');
		
	let userSocketIdSet = userSocketIdMap.get(userName);

	console.log('usersockets',userSocketIdSet);
	userSocketIdSet.delete(socketId);
	//if there are no clients for a user, remove that user from online list (map)
	if (userSocketIdSet.size ==0 ) {
	userSocketIdMap.delete(userName);
	}
	}
	}