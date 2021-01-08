//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	Mongoose = require('mongoose');
router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Offer = require('../models/offer'),
	Load = require('../models/load'),
	User = require('../models/user'),
	Credit = require('../models/credit'),
	Proposal = require('../models/proposal');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth'),
	checkCredits = require('../middleware/credits/check');

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Offer
//============================================================================================================================================
router.post('/api/offers', function(req, res) {
	console.log(req.body);
	let offer = req.body;
	offer.client = req.user;
	offer.status = 'Active';

	Offer.create(offer, function(err, newOffer) {
		if (err) {
			console.log(err);
		}

		return res.json(newOffer);
	});
});

// ===========================================================================================================================================
//  All Offers
//  Display All Offers where the current user is the transporter
//============================================================================================================================================

router.get('/api/offers', async function(req, res) {
	// const userId = req.params.userId;
	const userId = req.user._id;

	Offer.find({
		$or  : [ { transporter: userId } ],
		$or  : [ { client: userId } ],
		$and : [ { status: 'Active' } ]
	})
		.populate({ path: 'transporter', model: 'User' })
		.populate({ path: 'client', model: 'User' })
		.populate({ path: 'load', model: 'Load' })
		.exec(function(err, foundOffers) {
			if (err) {
				console.log('chatrooms error', err.message);
			} else {
				console.log('foundOffers', 'Run');
				res.json(foundOffers);
			}
		});
});

// ===========================================================================================================================================
//  All Offers wich match the chatroom id
//  Display All Offers where the current user is the transporter
//============================================================================================================================================

router.get('/api/offers/:chatroomId', async function(req, res) {
	const chatroomId = req.params.chatroomId;
	// const userId = req.user._id;

	console.log('chatroom id', chatroomId);

	Offer.find({
		$or  : [ { chatroom: chatroomId } ],
		$and : [ { status: 'Active' } ]
	})
		.populate({ path: 'transporter', model: 'User' })
		.populate({ path: 'client', model: 'User' })
		.populate({ path: 'load', model: 'Load' })
		.exec(function(err, foundOffers) {
			if (err) {
				console.log('chatrooms error', err.message);
			} else {
				res.json(foundOffers);
			}
		});
});

/**
 * Put might replace
 * so we can use patch
 */
router.put('/api/offers/:offerId', function(req, res) {
	const offer = req.body;
	const offerId = req.params.offerId;

	Offer.findByIdAndUpdate(offerId, offer, { new: true }, function(err, updatedOffer) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			return res.json(updatedOffer);
		}
	});
});

module.exports = router;
