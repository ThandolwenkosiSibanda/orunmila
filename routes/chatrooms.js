//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	Mongoose = require('mongoose'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Credit = require('../models/credit'),
	Chatroom = require('../models/chatroom'),
	Message = require('../models/message'),
	Load = require('../models/load'),
	Proposal = require('../models/proposal'),
	{ User, validate } = require('../models/user');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	googleAuth = require('../middleware/auth/googleAuth'),
	unauth = require('../middleware/auth/unauth');

// ===========================================================================================================================================
//  Index
// To Display All Chatrooms That Belong to a User
//============================================================================================================================================

router.get('/api/chatrooms/user/:userId', function(req, res) {
	// const userId = req.params.userId;
	const userId = req.user._id;

	Chatroom.find({
		$or : [ { client: userId }, { transporter: userId } ]
	})
		.populate({ path: 'transporter', model: 'User' })
		.populate({ path: 'client', model: 'User' })
		.populate({ path: 'messages', model: 'Message', populate: { path: 'user', model: 'User' } })
		.exec(function(err, foundChatrooms) {
			if (err) {
				console.log('chatrooms error', err.message);
			} else {
				res.json(foundChatrooms);
			}
		});
});

// ===========================================================================================================================================
//  Create- New Chatroom
// Show The Form For Creating A new Chatroom and saving the first message
//============================================================================================================================================
// router.post('/chatrooms/:user_id/new', auth, function(req, res) {
// 	var user_id = req.params.user_id;
// 	var proposal = req.body.proposal;
// 	var id = req.user._id;

// 	//Check if the chatroom for the Load & Client % Transporter does not already exist then redirect to it
// 	Chatroom.findOne(
// 		{
// 			$and : [
// 				{ load: proposal.loadid },
// 				{ transporter: user_id },
// 				{ client: id }
// 			]
// 		},
// 		function(err, foundChatroom) {
// 			if (err) {
// 				console.log(err);
// 			}
// 			else {
// 				if (foundChatroom == null) {
// 					User.findById(user_id, function(err, proposalUser) {
// 						if (err) {
// 							console.log('error');
// 						}

// 						Chatroom.aggregate(
// 							[
// 								{ $match: { client: new Mongoose.Types.ObjectId(id) } },
// 								{
// 									$lookup : {
// 										from         : 'users',
// 										localField   : 'transporter',
// 										foreignField : '_id',
// 										as           : 'user'
// 									}
// 								}
// 							],
// 							function(err, chatrooms) {
// 								if (err) {
// 									res.render('dashboard/load/index', {
// 										loads : loads
// 									});
// 								}
// 								else {
// 									res.render('chatrooms/add', {
// 										proposalUser : proposalUser,
// 										proposal     : proposal,
// 										chatrooms    : chatrooms
// 									});
// 								}
// 							}
// 						);
// 					});
// 				}
// 				else {
// 					res.redirect('/chatrooms/rooms/' + foundChatroom._id);
// 				}
// 			}
// 		}
// 	);
// });

// ===========================================================================================================================================
//  Store
//  Check if the chatroom exists ->create if it doesnt, return the details if it does
//============================================================================================================================================
router.post('/api/chatrooms', function(req, res) {
	var chatroom = req.body;

	Chatroom.findOne(
		{
			$and : [
				{ load: chatroom.loadId },
				{ proposal: chatroom.proposalId },
				{ transporter: chatroom.transporterId },
				{ client: chatroom.clientId }
			]
		},
		function(err, foundChatroom) {
			if (err) {
				res.json(newChatroom);
			} else {
				if (foundChatroom == null) {
					Chatroom.create(chatroom, function(err, newChatroom) {
						if (err) {
							console.log(err);
						} else {
							res.json(newChatroom);
						}
					});
				} else {
					return res.json(foundChatroom);
				}
			}
		}
	);
});

// ===========================================================================================================================================
//  Show =  Chatroom
// To Display A Chatroom That Belongs to a User by Id and show the messages
//============================================================================================================================================

router.get('/api/chatrooms/rooms/:id', function(req, res) {
	var id = req.params.id;

	Chatroom.findById(id)
		.populate('transporter')
		.populate('client')
		.populate('messages')
		.exec(function(err, foundChatroom) {
			if (err) {
				console.log('err', err);
			} else {
				Message.find({ chatroom: foundChatroom._id }).populate('user').exec(function(err, messages) {
					if (err) {
						console.log(err);
					} else {
						Chatroom.find({
							$or : [ { client: req.user }, { transporter: req.user } ]
						})
							.populate('transporter')
							.populate('client')
							.populate('messages')
							.exec(function(err, foundChatrooms) {
								if (err) {
									console.log('chatroom error', err);
								} else {
									return res.json(messages);
								}
							});
					}
				});
			}
		});
});

function checkRoomOwner(req, res, next) {
	var id = req.params.id;
	Chatroom.findById(id).populate('transporter').populate('client').exec(function(err, foundChatroom) {
		if (foundChatroom.client._id == req.user._id || foundChatroom.transporter._id == req.user._id) {
			next();
		} else {
			console.log('You do not belong to this Room');
			res.redirect('/loads');
		}
	});
}

module.exports = router;
