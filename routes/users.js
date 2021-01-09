/**
*  Required modules
*/

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
	bcrypt = require('bcrypt'),
	router = express.Router();

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
const storage = new GridFsStorage({
	url  : process.env.MONGODB_URI,
	file : (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename   : filename,
					bucketName : 'uploads'
				};
				resolve(fileInfo);
			});
		});
	}
});

let uploads = (module.exports.uploads = multer({ storage }));

//========================================================================================================================================
// Required models
//========================================================================================================================================
const { User } = require('../models/user');

//========================================================================================================================================
// Required middleware
//========================================================================================================================================
const auth = require('../middleware/auth/auth'),
	unauth = require('../middleware/auth/unauth');
const user = require('../models/user');

//=======================================================================================================================================
// Login
//  Handle login Using Mongoose Passport Local
///======================================================================================================================================

//handling users Logins
router.post(
	'/api/login',
	passport.authenticate('local', {
		failureRedirect : '/login',
		failureFlash    : true
	}),
	(req, res) => {
		var user = req.user;
		const token = user.generateAuthToken();
		res.cookie('auth', token);
		return res.json(user);
	}
);

//==========================================================================================================================================

// router.get("/current", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

router.post('/api/users', async (req, res) => {
	// validate the request body first

	let body = req.body;

	//find an existing user
	let user = await User.findOne({ email: req.body.email });

	if (user) return res.status(400).send('User already registered.');

	user = new User({
		name     : req.body.name,
		surname  : req.body.surname,
		password : req.body.password,
		email    : req.body.email
	});
	user.password = await bcrypt.hash(user.password, 10);
	await user.save();

	const token = user.generateAuthToken();

	console.log('token', token);

	res.header('x-auth-token', token).send({
		_id     : user._id,
		name    : user.name,
		surname : user.surname,
		email   : user.email
	});
});

router.get('/api/logout', function(req, res) {
	cookie = req.cookies;
	for (var prop in cookie) {
		if (!cookie.hasOwnProperty(prop)) {
			continue;
		}
		res.cookie(prop, '', { expires: new Date(0) });
	}

	return res.json({});
});

router.get('/api/currentuser', (req, res) => {
	if (req.user) {
		return res.json(req.user);
	}
});

// router.post('/login', function(req, res){
//   var email = req.body.user.email;

//   User.find({email: email}, async function (err, foundUser) {
//       if (err) {
//           console.log('error');
//       }

//       console.log(foundUser);
//     if(foundUser){
//       user = new User({
//         name: req.body.name,
//         password: req.body.password,
//         email: req.body.email
//       });

//       const token = user.generateAuthToken();
//       res.cookie('auth',token);
//       console.log('success');
//       res.redirect('/transporters');
// } else{
//   console.log("error");
// }

//   });
// });

module.exports = router;
