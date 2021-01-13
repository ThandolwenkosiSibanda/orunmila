//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Project = require('../models/project'),
	Reviewer = require('../models/reviewer'),
	{ User } = require('../models/user'),
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

router.post('/api/reviewers', function(req, res) {
	const reviewer = req.body;
	console.log('addReviewer', reviewer);

	let projectId = req.body.projectId;
	let email = req.body.email;

	User.findOne({
		$or : [ { email: email } ]
	}).exec(function(err, foundUser) {
		if (err) {
			console.log(err);
		} else {
			if (foundUser) {
				Project.findById(projectId, function(err, foundProject) {
					foundProject.reviewers.push(foundUser);
					foundProject.save(function(err, data) {
						if (err) {
							console.log(err);
						} else {
							foundUser.projects.push(foundProject);
							foundUser.save(function(err, data) {
								if (err) {
									console.log(err);
								} else {
									return res.json(data);
								}
							});
						}
					});
				});
			}
		}
	});
});

router.post('/api/reviewers/remove', function(req, res) {
	let user = req.user;
	let body = req.body;
	const reviewerId = req.body.reviewerId;
	const projectId = req.body.projectId;

	Project.findById(projectId, function(err, foundProject) {
		if (err) {
			console.log(err);
			return res.json(err);
		}

		const index = foundProject.reviewers.indexOf(reviewerId);
		foundProject.reviewers.splice(index, 1);
		foundProject.save(function(err, data) {
			if (err) {
				console.log(err);
				return res.json(err);
			} else {
				console.log('success');
				return res.json(data);
			}
		});
	});
});

module.exports = router;
