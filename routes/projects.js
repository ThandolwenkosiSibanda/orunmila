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
const Project = require('../models/project'),
	{ User } = require('../models/user'),
	Article = require('../models/article'),
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
	'/api/projects',
	uploads.fields([
		{
			name     : 'csv',
			maxCount : 1
		}
	]),
	(req, res) => {
		let projectDetails = req.body;
		let user = req.user;
		let data = {};

		let reviewers = [ user._id ];

		console.log('project Details', projectDetails);

		projectDetails.user = user._id;
		projectDetails.status = 'active';
		projectDetails.csv = req.files.csv[0].filename;
		// projectDetails.createdAt = Date.now();
		projectDetails.reviewers = reviewers;

		let absolutePath = path.resolve('./uploads/' + req.files.csv[0].filename);

		// MongoClient.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
		// 	if (err) throw err;
		// 	let dbo = db.db('trucker-zim');
		// 	dbo.collection('projects').insertOne(projectDetails, (err, result) => {
		// 		if (err) throw err;

		// 		importCsvData2MongoDB(absolutePath, result.insertedId, result.ops[0].threshold);

		// 		User.findById(user, function(err, foundUser) {
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				foundUser.projects.push(result.insertedId);
		// 				foundUser.save(function(err, data) {});
		// 			}
		// 		});

		// 		db.close();
		// 	});
		// });

		// return res.json(projectDetails);

		Project.create(projectDetails, function(err, newProject) {
			if (err) {
				console.log(error);
			}

			importCsvData2MongoDB(absolutePath, newProject._id, newProject.threshold);
			User.findById(user, function(err, foundUser) {
				if (err) {
					console.log(err);
				} else {
					foundUser.projects.push(newProject);
					foundUser.save(function(err, data) {});
				}
			});

			return res.json(newProject);
		});
	}
);

function importCsvData2MongoDB(filePath, projectId, threshold) {
	csv().fromFile(filePath).then((jsonObj) => {
		let newJsonObj = jsonObj.map(function(object) {
			object.project = projectId;
			object.threshold = threshold;
			object.status = 'active';
			return object;
		});

		MongoClient.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
			if (err) throw err;
			let dbo = db.db('trucker-zim');
			dbo.collection('articles').insertMany(newJsonObj, (err, res) => {
				if (err) throw err;
				console.log('Number of documents inserted: ' + res.insertedCount);
				db.close();
			});
		});

		fs.unlinkSync(filePath);
	});
}

router.get('/api/projects', function(req, res) {
	let user = req.user._id;

	let { status } = JSON.parse(req.query.status);

	console.log('status', status);

	// Project.find(user).populate('projects').sort({ $natural: -1 }).exec(function(err, user) {

	// }

	User.findById(user).populate('projects').sort({ $natural: -1 }).exec(function(err, user) {
		if (err) {
			console.log(err);
		} else {
			let filteredProjects =
				user.projects &&
				user.projects.filter((project) => {
					return project.status === status;
				});
			console.log('fcount', filteredProjects.length);

			return res.json(filteredProjects);
		}
	});
});

router.get('/api/myprojects', function(req, res) {
	let user = req.user;

	let { status } = JSON.parse(req.query.status);

	console.log('status', status);

	Project.find({
		$or : [ { user: user } ]
	})
		.populate('project')
		.populate('reviewers')
		.sort({ $natural: -1 })
		.exec(function(err, projects) {
			if (err) {
				console.log(err);
			} else {
				let filteredProjects =
					projects &&
					projects.filter((project) => {
						return project.status === status;
					});

				return res.json(filteredProjects);
			}
		});
});

router.get('/api/projects/:id', function(req, res) {
	let user = req.user;
	const projectId = req.params.id;

	Article.find({
		$or : [ { project: projectId } ]
	})
		// .where({ votes: { $in: [ '5ff63d7e63b5132bfc68ceb5' ] } })
		.populate('project')
		.populate({ path: 'votes', populate: { path: 'reviewer', model: 'User' } })
		.limit(50)
		.sort({ $natural: -1 })
		.exec(function(err, articles) {
			if (err) {
				console.log(err);
			} else {
				let filteredArticles =
					articles &&
					articles.filter((article) => {
						return article.status === 'active';
					});

				return res.json(filteredArticles);
			}
		});
});

router.delete('/api/projects/:projectId', function(req, res) {
	const projectId = req.params.projectId;

	Project.findByIdAndDelete(projectId, function(err, deletedProject) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			console.log('deleted Project', deletedProject);
			return res.json(deletedProject);
		}
	});
});

module.exports = router;
