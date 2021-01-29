//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	Mongoose = require('mongoose');
router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const User = require('../models/user'),
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
//  Save the Details of a new User
//============================================================================================================================================
router.post('/api/signup', function(req, res) {
	console.log(req.body);
	let offer = req.body;
	offer.client = req.user;
	offer.status = 'Active';

	User.create(offer, function(err, newOffer) {
		if (err) {
			console.log(err);
		}

		return res.json(newOffer);
	});
});

module.exports = router;
