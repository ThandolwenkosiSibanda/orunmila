//========================================================================================================================================
// Required modules
//========================================================================================================================================
const express = require('express'),
	pdf = require('html-pdf'),
	path = require('path'),
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

const pdfTemplate = require('../reports/index');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth'),
	checkCredits = require('../middleware/credits/check');

// ===========================================================================================================================================
//  Store
//  Save the Details of a new Contract
//============================================================================================================================================
router.post('/api/reports', (req, res) => {
	const reportData = req.body;
	const user = req.user._id;

	console.log('user', user);

	config = {
		format           : 'Letter', // allowed units: A3, A4, A5, Legal, Letter, Tabloid
		orientation      : 'portrait', // portrait or landscape

		border           : {
			top    : '20px', // default is 0, units: mm, cm, in, px
			right  : '20px',
			bottom : '20px',
			left   : '20px'
		},

		paginationOffset : 1, // Override the initial pagination number
		header           : {
			height   : '60px',
			contents : '<div style="text-align: center;">Orunmila Project Report</div>'
		},
		footer           : {
			height   : '50px',
			contents : {
				default : '<span style="color: #444;">{{page}}</span> of <span>{{pages}}</span>' // fallback value
			}
		},

		// File options
		type             : 'pdf', // allowed file types: png, jpeg, pdf
		quality          : '75' // only used for types png & jpeg
	};

	let acceptedArticlesList = () => {
		let acceptedArticles = reportData.articles.filter((article) => article.status === 'accepted').map((article) => {
			return `
			<hr>
			<p><strong>Article Title:</strong></p>
			<p>${article.Title}</p>
			<p><strong>Abstract:</strong></p>
			<p>${article.Abstract}</p>
		   
			`;
		});

		return acceptedArticles;
	};

	newPdf = pdf
		.create(pdfTemplate(reportData, acceptedArticlesList), config)
		.toFile('./uploads/report.pdf', function(err, result) {
			if (err) {
				console.log(err);
				res.send(Promise.reject());
			}
			console.log(result); // { filename: '/app/businesscard.pdf' }

			res.send(Promise.resolve());
		});
});

// ===========================================================================================================================================
//  All Offers
//  Display All Offers where the current user is the transporter
//============================================================================================================================================

router.get('/api/reports', async function(req, res) {
	console.log('GET REPORT');

	let absolutePath = path.resolve('./uploads/report.pdf');
	return res.sendFile(absolutePath);
});

module.exports = router;
