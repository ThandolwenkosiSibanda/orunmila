//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	{ Paynow } = require('paynow'),
	Mongoose = require('mongoose'),
	router = express.Router();

//========================================================================================================================================
// Required Models
//========================================================================================================================================

const Credit = require('../models/credit'),
	{ User, validate } = require('../models/user');

//========================================================================================================================================
// Required Middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');

//======================================================================================================================================
// Create instance of Paynow class
//======================================================================================================================================
let paynow = new Paynow(process.env.INTEGRATION_ID, process.env.INTEGRATION_KEY);

// Set return and result urls
paynow.resultUrl = '/';
paynow.returnUrl = '/';

//======================================================================================================================================
//  Index
// To Display The Credits History
//======================================================================================================================================

router.get('/api/credits', function(req, res) {
	var userId = req.user._id;

	Credit.aggregate([ { $match: { user: userId } }, { $sort: { createdAt: -1 } } ], function(err, foundCredits) {
		if (err) {
			console.log(err);
		} else {
			Credit.aggregate(
				[
					{ $match: { user: userId } },
					{ $sort: { _id: 1 } },
					{
						$group : {
							_id   : '$user',
							total : {
								$sum : '$value'
							}
						}
					}
				],
				function(err, creditsTotals) {
					if (err) {
						console.log(err);
					} else {
						return res.json(foundCredits);
					}
				}
			);
		}
	});
});

// ===========================================================================================================================================
//  Purchase Credits
//  Purchase The Credits Using Paynow and then save the details In the Database
//============================================================================================================================================
router.post('/api/credits', function(req, res) {
	const userId = req.user._id;
	const credit = req.body;
	credit.origin = 'Buying';
	credit.reference = 'Ecocash';
	credit.user = userId;
	const phoneNumber = '0771111111';

	//Calculate the amount of credits to be given

	if (credit.amount == 1) {
		credit.value = 1;
	} else if (credit.amount == 5) {
		credit.value = 5;
	} else {
		credit.value = 10;
	}
	var ref = new Date().getTime();

	const payment = paynow.createPayment(`Invoice ${ref}`, 'sibandathandolwenkosi2@gmail.com');
	payment.add('Credits', credit.amount);

	makePayment();

	async function makePayment() {
		try {
			const response = await paynow.sendMobile(payment, phoneNumber, 'ecocash');
			if (response && response.success) {
				Credit.create(credit, function(err, newCredit) {
					if (err) {
						res.redirect('credits');
					}
					res.json(newCredit);
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
});

router.get('/api/credit', auth, function(req, res) {
	const ref = new Date().getTime();
	const payment = paynow.createPayment(`Invoice ${ref}`, 'sibandathandolwenkosi2@gmail.com');
	payment.add('Bananas', 2.5);

	// paynow.send(payment).then(response => {
	//     // Check if request was successful
	//     if (response.success) {
	//       // Get the link to redirect the user to, then use it as you see fit
	//       let link = response.redirectUrl;
	//       console.log(link);
	//     }
	//   });

	// paynow.sendMobile(payment, '0771111111', 'ecocash').then(response => {
	//     // Check if request was successful
	//     if (response.success) {
	//       // Get the link to redirect the user to, then use it as you see fit
	//       console.log(response
	//         );
	//     }
	//   });

	makePayment();

	async function makePayment() {
		try {
			const response = await paynow.sendMobile(payment, '0771111111', 'ecocash');
			if (response && response.success) {
				console.log(response);
			} else {
				console.log(response);
			}
		} catch (e) {
			console.log(e);
		}
	}

	res.send('Page');
});

router.get('/api/credit/total', auth, function(req, res) {
	const userId = req.user._id;
	Credit.aggregate(
		[
			{ $match: { user: userId } },
			{ $sort: { _id: 1 } },
			{
				$group : {
					_id   : '$user',
					total : {
						$sum : '$value'
					}
				}
			}
		],
		function(err, creditsTotal) {
			if (err) {
				console.log(err);
			} else {
				return res.json(creditsTotal);
			}
		}
	);
});

module.exports = router;
