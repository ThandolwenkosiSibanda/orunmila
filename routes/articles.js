//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	Mongoose = require('mongoose'),
	_ = require('lodash');

router = express.Router();

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Article = require('../models/article'),
	{ User } = require('../models/user'),
	Credit = require('../models/credit'),
	Proposal = require('../models/proposal');

// ===========================================================================================================================================
//  Get Articles
//  Update The Information on the load
//============================================================================================================================================

router.get('/api/articles/:projectId', function(req, res) {
	const projectId = req.params.projectId;

	Article.find({
		project : projectId
	})
		.populate({ path: 'project', model: 'Project' })
		.populate({ path: 'votes', model: 'Vote' })
		.exec(function(err, foundArticles) {
			if (err) {
				console.log('chatrooms error', err.message);
			} else {
				console.log('foundArticles', foundArticles.length);
				res.json(foundArticles);
			}
		});
});

// ===========================================================================================================================================
//  Delete Load
//  Update The Information on the load
//============================================================================================================================================

router.delete('/api/articles/:articleId', function(req, res) {
	const articleId = req.params.articleId;

	Article.findByIdAndDelete(articleId, function(err, deletedArticle) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			console.log('deleted Article', deletedArticle);
			return res.json(deletedArticle);
		}
	});
});

router.put('/api/articles/:articleId', function(req, res) {
	const article = req.body;
	const articleId = req.params.articleId;

	Article.findByIdAndUpdate(articleId, article, function(err, updatedArticle) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			console.log('upadted', updatedArticle);
			return res.json(updatedArticle);
		}
	});
});

module.exports = router;
