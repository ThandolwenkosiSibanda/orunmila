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

module.exports = router;
