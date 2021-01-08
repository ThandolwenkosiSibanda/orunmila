//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	Mongoose = require('mongoose'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Load = require('../models/load'),
	{ User, validate } = require('../models/user'),
	Proposal = require('../models/proposal');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');

// ===========================================================================================================================================
//  Active Loads
//  Display All Active Loads the user is the owner
//============================================================================================================================================

router.get('/api/dashboard/myloads/active', auth, function(req, res) {
	var id = req.user._id;
	Load.aggregate(
		[
			{ $match: { user: new Mongoose.Types.ObjectId(id) } },
			{ $match: { status: 'active' } },
			{ $sort: { _id: -1 } }
		],
		function(err, loads) {
			if (err) {
				res.render('dashboard/load/index', {
					loads : loads
				});
			} else {
				res.render('dashboard/load/index', {
					loads : loads
				});
			}
		}
	);
});

// ===========================================================================================================================================
//  Completed Loads
//  Display All Completed Loads the user is the owner
//============================================================================================================================================

router.get('/api/dashboard/myloads/completed', auth, function(req, res) {
	var id = req.user._id;
	Load.aggregate(
		[
			{ $match: { user: new Mongoose.Types.ObjectId(id) } },
			{ $match: { status: 'done' } },
			{ $sort: { _id: -1 } }
		],
		function(err, loads) {
			if (err) {
				res.render('dashboard/load/index', {
					loads : loads
				});
			} else {
				res.render('dashboard/load/index', {
					loads : loads
				});
			}
		}
	);
});

// ===========================================================================================================================================
//  All Loads
//  Display All Active Loads the user is the owner
//============================================================================================================================================

router.get('/api/dashboard/myloads', auth, function(req, res) {
	var id = req.user._id;
	Load.aggregate([ { $match: { user: new Mongoose.Types.ObjectId(id) } }, { $sort: { _id: -1 } } ], function(
		err,
		loads
	) {
		if (err) {
			res.render('dashboard/load/index', {
				loads : loads
			});
		} else {
			res.render('dashboard/load/index', {
				loads : loads
			});
		}
	});
});

// ===========================================================================================================================================
//  Show Load Details
//  Display the Full Details Of the Individual Load and also include the proposals for the Loads.
//============================================================================================================================================

router.get('/api/dashboard/myloads/:loadid', auth, function(req, res) {
	var id = req.params.loadid;

	Load.findById(id)
		.populate({ path: 'proposals', model: 'Proposal', populate: { path: 'user', model: 'User' } })
		.exec(function(err, foundLoad) {
			if (err) {
				console.log('error');
			}
			res.render('dashboard/load/show', {
				load : foundLoad
			});
		});
});

// ===========================================================================================================================================
//  Show Proposal
//  Display the Full Details Of the Proposal for an Individual Load
//============================================================================================================================================

router.get('/api/proposals/:proposalid', auth, function(req, res) {
	var id = req.params.proposalid;

	Proposal.findById(id).populate({ path: 'load', model: 'Load' }).populate('user').exec(function(err, foundProposal) {
		if (err) {
			console.log('error');
		}
		res.render('dashboard/proposal/show', {
			proposal : foundProposal
		});
	});
});

// ===========================================================================================================================================
//  Reports- Overview
//  Display the overview of the reports
//============================================================================================================================================

router.get('/api/dashboard/reports/overview', auth, function(req, res) {
	var id = req.user._id;
	Load.aggregate(
		[
			{ $match: { user: new Mongoose.Types.ObjectId(id) } },
			{ $match: { status: 'active' } },
			{ $sort: { _id: -1 } }
		],
		function(err, activeLoads) {
			if (err) {
				res.redirect('/loads');
			} else {
				Load.aggregate(
					[ { $match: { user: new Mongoose.Types.ObjectId(id) } }, { $sort: { _id: -1 } } ],
					function(err, allLoads) {
						if (err) {
							res.redirect('/loads');
						} else {
							Proposal.aggregate(
								[ { $match: { user: new Mongoose.Types.ObjectId(id) } }, { $sort: { _id: -1 } } ],
								function(err, proposals) {
									if (err) {
										res.redirect('/loads');
									} else {
										Load.aggregate(
											[
												{ $match: { transporter: new Mongoose.Types.ObjectId(id) } },
												{ $match: { status: 'done' } },
												{ $sort: { _id: -1 } }
											],
											function(err, transportedLoads) {
												if (err) {
													console.log('err');
												} else {
													res.render('dashboard/reports/index', {
														activeLoads      : activeLoads,
														allLoads         : allLoads,
														proposals        : proposals,
														transportedLoads : transportedLoads
													});
												}
											}
										);
									}
								}
							);
						}
					}
				);
			}
		}
	);
});

// ===========================================================================================================================================
//  All Proposals
//  Display All Proposals where the user is the owner
//============================================================================================================================================

router.get('/api/dashboard/myproposals/', auth, async function(req, res) {
	var id = req.user._id;
	try {
		const proposals = await Proposal.aggregate([
			{ $match: { user: new Mongoose.Types.ObjectId(id) } },
			{ $sort: { _id: -1 } }
		]);

		console.log(proposals);

		return res.json();
	} catch (error) {
		console.log(error);
	}
});

// ===========================================================================================================================================
//  All Proposals
//  Display All Proposals where the user is the owner by Status
//============================================================================================================================================

router.get('/api/dashboard/myproposals/:status', auth, async function(req, res) {
	var status = req.params.status;
	var id = req.user._id;
	try {
		const proposals = await Proposal.aggregate([
			{ $match: { user: new Mongoose.Types.ObjectId(id) } },
			{ $match: { status: status } },
			{ $sort: { _id: -1 } }
		]);

		await Load.populate(proposals, { path: 'load' });

		res.render('dashboard/proposal/index', {
			proposals : proposals
		});
	} catch (error) {
		console.log(error);
	}
});

// ===========================================================================================================================================
//  Show Proposal
//  Display All The Details of a Proposal where the user is the owner
//============================================================================================================================================

router.get('/api/dashboard/proposals/:proposalid', auth, async function(req, res) {
	var id = req.user._id;
	var proposalid = req.params.proposalid;

	Proposal.findById(proposalid)
		.populate({ path: 'load', model: 'Load', populate: { path: 'user', model: 'User' } })
		.exec(function(err, foundProposal) {
			if (err) {
				console.log('error');
			}

			res.render('proposal/show', {
				proposal : foundProposal
			});
		});
});

// ===========================================================================================================================================
//  Reject A Proposal
//  Update The Status of the Proposal to be Rejected
//============================================================================================================================================

router.post('/api/reject', auth, function(req, res) {
	var proposal = req.body.proposal;
	var id = proposal._id;
	proposal.status = 'Rejected';
	Proposal.findByIdAndUpdate(id, proposal, function(err, rejectedProposal) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			console.log(rejectedProposal);
			res.redirect('/dashboard/myloads/' + rejectedProposal.load);
		}
	});
});

module.exports = router;
