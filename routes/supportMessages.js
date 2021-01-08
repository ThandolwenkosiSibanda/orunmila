//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Credit = require('../models/credit'),
	SupportMessage = require('../models/supportMessage'),
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

router.post('/api/supportMessages', function(req, res) {
	const message = req.body;
	message.status = 'unread';
	message.user = req.user;

	SupportMessage.create(message, function(err, newMessage) {
		if (err) {
			res.send('Error');
		} else {
			console.log('Success Message has been succefully sent');
		}
	});
});

router.get('/api/supportMessages/:chatroomId', function(req, res) {
	const chatroomId = req.params.chatroomId;

	SupportMessage.find({ chatroom: chatroomId })
		.populate({ path: 'user', model: 'User' })
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
