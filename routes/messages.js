//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Credit = require('../models/credit'),
	Message = require('../models/message'),
	{ User } = require('../models/user'),
	Chatroom = require('../models/chatroom'),
	Load = require('../models/load');
Proposal = require('../models/proposal');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');

// ===========================================================================================================================================
// Store
// Save messages to the database
//============================================================================================================================================

router.post('/api/messages', function(req, res) {
	const message = req.body;
	message.status = 'unread';
	message.user = req.user;

	console.log('Fired the save message');

 Message.create(message, function(err, newMessage) {

	if (err) {
				res.send('Error');
			}else{
				console.log('Success')
			}
 })


	// Message.create(message, function(err, newMessage) {
	// 	if (err) {
	// 		res.send('Error');
	// 	}
	// 	else {
	// 		Chatroom.findById(newMessage.chatroom, function(err, foundChatroom) {
	// 			foundChatroom.messages.push(newMessage._id);
	// 			foundChatroom.save(function(err, data) {
	// 				if (err) {
	// 					console.log(err);
	// 				}
	// 				else {
	// 					Message.findById(newMessage._id)
	// 						.populate({ path: 'user', model: 'User' })
	// 						.populate({ path: 'chatroom', mode: 'Chatroom' })
	// 						.exec(function(err, data) {
	// 							return res.json(data);
	// 						});
	// 				}
	// 			});
	// 		});
	// 	}
	// });
});

router.get('/api/messages/:chatroomId', function(req, res) {
	const chatroomId = req.params.chatroomId;


	Message.find({chatroom: chatroomId})
	 .populate({ path: 'user', model: 'User'})
	  .exec(function(err, foundMessages) {
		 		if (err) {
					console.log(err);
				} else {
	 			res.json(foundMessages);
				}
	});

	// Chatroom.findById(chatroomId)
	// 	.populate({ path: 'messages', model: 'Message', populate: { path: 'user', model: 'User' } })
	// 	.exec(function(err, foundChatroom) {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			res.json(foundChatroom.messages);
	// 		}
	// 	});
});

module.exports = router;
