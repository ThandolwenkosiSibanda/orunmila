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
	Load = require('../models/load'),
	Proposal = require('../models/proposal');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth'),
	checkProposal = require('../middleware/proposal/check'),
	checkLoad = require('../middleware/load/check'),
	checkCredits = require('../middleware/credits/check');

// ===========================================================================================================================================
//  All Proposals
//  Display All Proposals where the user is the owner
//============================================================================================================================================

router.get('/api/myproposals/', async function(req, res) {
	const userId = req.user._id;
	const status = 'Active';

	try {
		const proposals = await Proposal.aggregate([
			{ $match: { user: userId } },
			{ $match: { status: status } },
			{ $sort: { _id: -1 } }
		]);

		await Proposal.populate(proposals, { path: 'load' });
		return res.json(proposals);
	} catch (error) {
		console.log(error);
	}
});
// ===========================================================================================================================================
//  Fetch Proposal
//  Display the Full Details Of the Proposal for an Individual Load
//============================================================================================================================================

router.get('/api/proposals/:proposalId', function(req, res) {
	var proposalId = req.params.proposalId;

	Proposal.findById(proposalId)
		.populate({ path: 'load', model: 'Load' })
		.populate({ path: 'user', model: 'User' })
		.exec(function(err, foundProposal) {
			if (err) {
				console.log('error');
			}

			return res.json(foundProposal);
		});
});

// ===========================================================================================================================================
//  Create- Proposal
// Show The Form For Creating A new Client
//============================================================================================================================================
router.get('/api/proposals/:load_id/apply', auth, checkCredits, checkProposal, checkLoad, function(req, res) {
	var load_id = req.params.load_id;

	Load.findById(load_id, function(err, foundLoad) {
		if (err) {
			console.log('error');
		}
		res.render('proposal/add', {
			load : foundLoad
		});
	});
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Proposal
//============================================================================================================================================
router.post('/api/proposals', auth, function(req, res) {
	const userId = req.user._id;
	const proposal = req.body;
	proposal.user = userId;
	proposal.status = 'Active';
	//
	credit = {};
	credit.user = userId;
	credit.value = -1;
	credit.origin = 'Proposal';

	Proposal.create(proposal, function(err, newProposal) {
		if (err) {
			console.log(err);
			res.send('Error');
		} else {
			Load.findById(newProposal.load, function(err, foundLoad) {
				if (err) {
					console.log(err);
				} else {
					foundLoad.proposals.push(newProposal);

					foundLoad.save(function(err, data) {
						if (err) {
							console.log(err);
							return res.redirect('/loads');
						} else {
							credit.reference = newProposal._id;

							Credit.create(credit, function(err, newCredit) {
								if (err) {
									// return res.redirect('/credits/purchase');
									res.redirect('credits');
								} else {
									return res.json(newProposal);
								}
							});

							// return res.json(newProposal);
						}
					});
				}
			});
		}
	});
});

// ===========================================================================================================================================
//  Update Proposal
//  Update The Information on the proposal
//============================================================================================================================================

router.put('/api/proposals/', function(req, res) {
	const proposal = req.body;
	proposalId = proposal.proposalId;

	Proposal.findByIdAndUpdate(proposalId, proposal, function(err, updatedProposal) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			res.json(updatedProposal);
		}
	});
});

module.exports = router;
