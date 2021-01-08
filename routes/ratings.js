//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Rating = require('../models/rating'),
	User = require('../models/user'),
	Contract = require('../models/contract');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Transporter
//============================================================================================================================================

router.post('/api/ratings', function(req, res) {
	const rating = req.body;
	const userId = req.user._id;
	const contractId = rating.contract;

	Rating.create(rating, function(err, newRating) {
		if (err) {
			console.log(err.message);
		}

		User.findById(rating.client, function(err, foundClient) {
			if (err) {
				console.log(err);
				return res.json(err);
			}
			foundClient.ratings.push(newRating);
			foundClient.save(function(err, data) {
				if (err) {
					console.log(err);
					return res.redirect('/loads');
				} else {
					User.findById(rating.transporter, function(err, foundTransporter) {
						if (err) {
							console.log(err);
							return res.json(err);
						}
						foundTransporter.ratings.push(newRating);
						foundTransporter.save(function(err, data) {
							if (err) {
								return res.json(err);
							}
							console.log('Routes Ratings');
							return res.json(data);
						});
					});
				}
			});
		});
	});
});

module.exports = router;
