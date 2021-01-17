//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Vote = require('../models/vote'),
	Project = require('../models/project'),
	User = require('../models/user'),
	Article = require('../models/article');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Transporter
//============================================================================================================================================

router.post('/api/votes', function(req, res) {
	const vote = req.body;
	const articleId = req.body.article;

	let reviewer = req.user;

	vote.reviewer = reviewer;

	Vote.create(vote, function(err, newVote) {
		if (err) {
			console.log(err.message);
		}

		Article.findById(articleId, function(err, foundArticle) {
			if (err) {
				console.log(err);
				return res.json(err);
			}
			foundArticle.votes.push(newVote);
			foundArticle.save(function(err, data) {
				if (err) {
					console.log(err);
				} else {
					Project.findById(foundArticle.project, function(err, foundProject) {
						if (err) {
							console.log(err);
						} else {
							foundProject.votes.push(newVote);

							foundProject.save(function(err, vote) {
								if (err) {
									console.log(err);
								} else {
									return res.json(data);
								}
							});
						}
					});
				}
			});
		});
	});
});

module.exports = router;
