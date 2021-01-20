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
	Grid = require('gridfs-stream'),
	crypto = require('crypto'),
	router = express.Router(),
	_ = require('lodash'),
	csv = require('csvtojson');

// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, __dirname + '/uploads');
	},
	filename    : (req, file, cb) => {
		console.log('uploaded file', file);
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
	}
});

let uploads = (module.exports.uploads = multer({ storage: storage }));

//========================================================================================================================================
// Required models
//========================================================================================================================================
const Project = require('../models/project'),
	{ User } = require('../models/user'),
	Article = require('../models/article');

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

		let absolutePath = path.resolve(__dirname + '/uploads/' + req.files.csv[0].filename);

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

		Article.collection.insertMany(newJsonObj, function(err, res) {
			if (err) {
				return console.error(err);
			} else {
				Project.findById(projectId, function(err, foundProject) {
					if (err) {
						console.log(err);
					} else {
						let insertedIds = res.insertedIds;
						console.log('insertedIds', insertedIds);

						for (i = 0; i < res.insertedCount; i++) {
							foundProject.articles.push(res.insertedIds[i]);
						}

						foundProject.save(function(err, savedProject) {
							console.log('saved Project', savedProject);
						});
					}
				});

				console.log('Success');
			}
		});

		fs.unlinkSync(filePath);
	});
}

router.get('/api/projects', isLoggedin, function(req, res) {
	let user = req.user;

	let { status } = JSON.parse(req.query.status);

	User.findById(user).populate('projects').sort({ $natural: -1 }).exec(function(err, user) {
		if (err) {
			console.log(err);
		} else {
			let filteredProjects =
				user.projects &&
				user.projects.filter((project) => {
					return project.status === status;
				});

			return res.json(filteredProjects);
		}
	});
});

router.get('/api/myprojects', function(req, res) {
	let user = req.user;
	let { status } = JSON.parse(req.query.status);

	// let status = 'active';

	console.log('myprojects', status);

	Project.find({
		user   : user,
		status : status
	})
		.populate('user')
		.populate('reviewers')
		.populate({ path: 'articles', model: 'Article' })
		.populate('votes')
		.sort({ $natural: -1 })
		.exec(function(err, projects) {
			if (err) {
				console.log(err);
			} else {
				console.log('myprojectsCount', projects.length);

				return res.json(projects);
			}
		});
});

router.get('/api/projects/:id', function(req, res) {
	let user = req.user;
	const projectId = req.params.id;

	Project.findById(projectId)
		.populate({ path: 'user', model: 'User' })
		.populate({ path: 'reviewers', model: 'User' })
		.populate({ path: 'articles', model: 'Article', populate: { path: 'votes', model: 'Vote' } })
		.populate({ path: 'votes', model: 'Vote', populate: { path: 'reviewer', model: 'User' } })
		.exec(function(err, foundProject) {
			if (err) {
				console.log('error');
			}

			return res.json(foundProject);
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

// ===========================================================================================================================================
//  Update Project
//  Update The Information on the Project
//============================================================================================================================================

/**
 * Put might replace
 * so we can use patch
 */
router.put('/api/projects/:projectId', function(req, res) {
	const project = req.body;
	const projectId = req.params.projectId;

	Project.findByIdAndUpdate(projectId, project, function(err, updatedProject) {
		if (err) {
			console.log('ERROR! Updating the Record Please Try Again');
		} else {
			return res.json(updatedProject);
		}
	});
});

function isLoggedin(req, res, next) {
	if (req.user) {
		return next();
	}
}

module.exports = router;
