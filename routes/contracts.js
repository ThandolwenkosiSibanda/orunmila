//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	Mongoose = require('mongoose');
router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Load = require('../models/load'),
	{ User } = require('../models/user'),
	Credit = require('../models/credit'),
	Contract = require('../models/contract'),
	Proposal = require('../models/proposal');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth'),
	checkCredits = require('../middleware/credits/check');

// ===========================================================================================================================================
//  Index
// To Display All the open jobs in the database
//============================================================================================================================================

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Contract
//============================================================================================================================================
router.post('/api/contracts', (req, res) => {
	const contract = req.body;
	contract.status = 'Open';
	contract.clientStatus = 'Open';
	contract.transporterStatus = 'Open';
	Contract.create(contract, function(err, newContract) {
		if (err) {
			console.log(error);
		}
		return res.json(newContract);
	});
});

// ===========================================================================================================================================
//  All Offers
//  Display All Offers where the current user is the transporter
//============================================================================================================================================

router.get('/api/contracts', async function(req, res) {
	// const userId = req.params.userId;
	const userId = req.user ? req.user._id : '';
	let { status } = JSON.parse(req.query.status);

	if (status === 'Closed') {
		console.log(status);
	}

	Contract.find({
		$or  : [ { transporter: userId }, { client: userId } ],
		// $or  : [ { clientStatus: 'Open' }, { transporterStatus: 'Open' } ],
		$and : [ { status: status } ]
	})
		.populate({ path: 'transporter', model: 'User' })
		.populate({ path: 'client', model: 'User' })
		.populate({ path: 'load', model: 'Load' })
		.exec(function(err, foundContracts) {
			if (err) {
				console.log('chatrooms error', err.message);
			} else {
				res.json(foundContracts);
			}
		});
});

/**
 * Update the  contract
 */

router.put('/api/contracts/:contractId', function(req, res) {
	const contract = req.body;
	const contractId = req.params.contractId;
	Contract.findByIdAndUpdate(contractId, contract, { new: true }, function(err, updatedContract) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			return res.json(updatedContract);
		}
	});
});

module.exports = router;
