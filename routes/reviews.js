/**
*  Required modules
*/

const fs = require('fs');

let MongoClient = require('mongodb').MongoClient;

const passport = require('passport'),
	mongoose = require('mongoose'),
	path = require('path'),
	mongodb = require('mongodb'),
	express = require('express'),
	multer = require('multer'),
	GridFsStorage = require('multer-gridfs-storage'),
	Grid = require('gridfs-stream'),
	{ OAuth2Client } = require('google-auth-library'),
	crypto = require('crypto'),
	router = express.Router(),
	_ = require('lodash'),
	csv = require('csvtojson');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thetruckerzim';

//=========================================================================================================================================
//  GridFs Stream
// Initialize GridFS Stream > Use an existing mongodb-native db instance
// ========================================================================================================================================

let gfs;
const conn = mongoose.createConnection(CONNECTION_URI, { useNewUrlParser: true });

conn.once('open', () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');
});

//=========================================================================================================================================
//  GridFsStorage
//  Create Storage Engine
//=========================================================================================================================================
// const storage = new GridFsStorage({
// 	url  : process.env.MONGODB_URI,
// 	file : (req, file) => {
// 		return new Promise((resolve, reject) => {
// 			crypto.randomBytes(16, (err, buf) => {
// 				if (err) {
// 					return reject(err);
// 				}
// 				const filename = buf.toString('hex') + path.extname(file.originalname);
// 				const fileInfo = {
// 					filename   : filename,
// 					bucketName : 'uploads'
// 				};
// 				resolve(fileInfo);
// 			});
// 		});
// 	}
// });

// const storage = multer.diskStorage({
// 	destination : (req, file, cb) => {
// 		cb(null, 'uploads');
// 	},
// 	filename    : (req, file, cb) => {
// 		console.log(file);
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	}
// });

global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename    : (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
	}
});

let uploads = (module.exports.uploads = multer({ storage }));

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Review = require('../models/review'),
	{ User } = require('../models/user'),
	Credit = require('../models/credit'),
	Proposal = require('../models/proposal');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth'),
	checkCredits = require('../middleware/credits/check');

// ===========================================================================================================================================
//  Store
//  Save the Details of a new load
//============================================================================================================================================
router.post(
	'/api/reviews',
	uploads.fields([
		{
			name     : 'csv',
			maxCount : 1
		}
	]),
	(req, res) => {
		// const userId = req.user ? req.user._id : req.user;
		// const review = req.body;
		// review.user = userId;
		// importCsvData2MongoDB(__basedir + '/uploads/' + req.files.csv[0].filename);
		// let path = req.files.csv[0].filename;
		// importCsvData2MongoDB('/uploads/' + path);

		var absolutePath = path.resolve('./uploads/' + req.files.csv[0].filename);

		importCsvData2MongoDB(absolutePath);

		console.log('yebo');

		console.log(req.body.title);

		// load.status = 'Active';
		// Load.create(load, function(err, newLoad) {
		// 	if (err) {
		// 		console.log(error);
		// 	}
		// 	return res.json(newLoad);
		// });
	}
);

function importCsvData2MongoDB(filePath) {
	csv().fromFile(filePath).then((jsonObj) => {
		jsonObj.forEach((review) => {
			review.status = 'Active';
			Review.create(review, function(err, newReview) {
				if (err) {
					console.log(error);
				}

				console.log('review', newReview);
			});
		});

		// MongoClient.connect(CONNECTION_URI, { useNewUrlParser: true }, (err, db) => {
		// 	if (err) throw err;
		// 	let dbo = db.db('trucker-zim');
		// 	dbo.collection('customers').insertMany(jsonObj, (err, res) => {
		// 		if (err) throw err;
		// 		console.log('Number of documents inserted: ' + res.insertedCount);
		// 		/**
		// 		   Number of documents inserted: 5
		// 	   */
		// 		db.close();
		// 	});
		// });

		return jsonObj;

		// fs.unlinkSync(filePath);
	});
}

// ===========================================================================================================================================
//  Index
// To Display All the open jobs in the database
//============================================================================================================================================

router.get('/api/reviews', function(req, res) {
	console.log('fired');
	const userId = req.user ? req.user._id : req.user;
	const limit = 100000;
	Load.find({})
		.where({ user: { $ne: userId } })
		.where({ status: { $eq: 'Active' } })
		.populate('proposals')
		.populate({ path: 'user', model: 'User', populate: { path: 'ratings', model: 'Rating' } })
		.sort({ $natural: -1 })
		.limit(limit)
		.exec(function(err, loads) {
			if (err) {
				console.log(err);
			} else {
				console.log('load', loads.length);
				return res.json(loads);
			}
		});
});

router.get('/api/reviews/filtered', function(req, res) {
	let { filters } = JSON.parse(req.query.filters);
	let searchTerm = filters.searchTerm ? filters.searchTerm : '';
	let city = filters.city ? filters.city : '';
	let budgets = filters.budgets ? filters.budgets : null;
	let proposals = filters.proposals ? filters.proposals : null;
	const userId = req.user ? req.user._id : req.user;
	const limit = 1000;
	let query = {};

	query.user = { $ne: userId };
	query.status = { $eq: 'Active' };
	query.description = { $regex: `.*${searchTerm}.*`, $options: 'i' };
	if (city && city !== '~All Cities~') {
		query.city = { $eq: city };
	}

	const activeBudgets = budgets.filter((budget) => {
		return budget.isChecked === true;
	});

	if (budgets[0] && budgets[0].isChecked) {
		query.budget = {
			$gte : 0,
			$lte : 101
		};
	}

	if (budgets[1] && budgets[1].isChecked) {
		query.budget = {
			$gte : 100,
			$lte : 501
		};
	}

	if (budgets[2] && budgets[2].isChecked) {
		query.budget = {
			$gte : 500,
			$lte : 1001
		};
	}

	if (budgets[3] && budgets[3].isChecked) {
		query.budget = {
			$gte : 1000
		};
	}

	// query.budget = {
	// 	$gte : budgets[0] && budgets[0].isChecked ? 0 : 0,
	// 	$lte : budgets[0] && budgets[0].isChecked ? 101 : 101,

	// 	$gte : budgets[1] && budgets[1].isChecked ? 100 : 0,
	// 	$lte : budgets[1] && budgets[1].isChecked ? 501 : 501,

	// 	$gte : budgets[2] && budgets[2].isChecked ? 500 && { $lte: 1000 } : 500,
	// 	$lte : budgets[2] && budgets[2].isChecked ? 1000 : 1000,
	// 	$gte : budgets[3] && budgets[3].isChecked ? 1000 : 0
	// };

	Load.find(query)
		.populate('proposals')
		.populate({ path: 'user', model: 'User', populate: { path: 'ratings', model: 'Rating' } })
		.sort({ $natural: -1 })
		.limit(limit)
		.exec(function(err, loads) {
			if (err) {
				console.log(err);
			} else {
				return res.json(loads);
			}
		});
});

// ===========================================================================================================================================
//  Show
//  Display the Full Details of the Load If not Owner
//============================================================================================================================================
router.get('/api/loads/:id', auth, function(req, res) {
	var loadid = req.params.id;
	var id = '5f06cbca58fad201fc1aec79';

	Load.findById(loadid).populate('user').exec(function(err, foundLoad) {
		if (err) {
			console.log('error');
		}

		Credit.aggregate(
			[
				{ $match: { user: new Mongoose.Types.ObjectId(id) } },
				{ $sort: { _id: -1 } },
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
					var creditsTotals = JSON.parse(JSON.stringify(creditsTotals));
					// res.render('load/show', {
					// 	load   : foundLoad,
					// 	totals : creditsTotals
					// });

					return res.json(foundLoad);
				}
			}
		);
	});
});

// ===========================================================================================================================================
//  Update Load
//  Update The Information on the load
//============================================================================================================================================

/**
 * Put might replace
 * so we can use patch
 */
router.put('/api/loads/:loadId', function(req, res) {
	const load = req.body;
	const loadId = req.params.loadId;

	Load.findByIdAndUpdate(loadId, load, function(err, updatedLoad) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			return res.json(updatedLoad);
		}
	});
});

// ===========================================================================================================================================
//  Delete Load
//  Update The Information on the load
//============================================================================================================================================

router.delete('/api/loads/:loadId', function(req, res) {
	const loadId = req.params.loadId;

	Load.findByIdAndDelete(loadId, function(err, deletedLoad) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			return res.json(deletedLoad);
		}
	});
});

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

router.get('/api/myloads', function(req, res) {
	const userId = req.user._id;
	// let status = req.params.status;

	let { status } = JSON.parse(req.query.status);

	function capitalise(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	Load.aggregate(
		[
			{ $match: { user: userId } },
			{ $match: { status: capitalise(status) } },
			{ $sort: { _id: -1 } },
			{ $lookup: { from: 'Proposal', localField: 'proposals', foreignField: '_id', as: 'proposals' } }
		],
		function(err, myLoads) {
			if (err) {
			} else {
				return res.json(myLoads);
			}
		}
	);
});

/**
 * Show
 * Display the Full Details of the Load If Owner
 */

router.get('/api/myloads/:loadId', checkOwner, function(req, res) {
	const loadId = req.params.loadId;
	const userId = req.params.userId;

	Load.findById(loadId)
		.populate({ path: 'proposals', match: { status: 'Active' }, populate: { path: 'user', model: 'User' } })
		.exec(function(err, foundLoad) {
			if (err) {
				console.log('error');
			} else {
				return res.json(foundLoad);
			}
		});
});

function checkOwner(req, res, next) {
	const user = req.user._id;
	const loadId = req.params.loadId;
	Load.findById(loadId).exec(function(err, foundLoad) {
		if (err) {
			console.log('error');
		} else {
			if (user.toString() === foundLoad.user.toString()) {
				next();
			} else {
				console.log('ngeke bafo');
			}
		}
	});
}

module.exports = router;
