const express = require('express'),
	http = require('http'),
	socketIO = require('socket.io'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose'),
	moment = require('moment'),
	flash = require('express-flash'),
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session'),
	passport = require('passport'),
	session = require('express-session'),
	path = require('path'),
	localStrategy = require('passport-local').Strategy,
	keys = require('./config/keys'),
	mongodb = require('mongodb'),
	multer = require('multer'),
	GridFsStorage = require('multer-gridfs-storage'),
	Grid = require('gridfs-stream'),
	crypto = require('crypto'),
	bcrypt = require('bcrypt'),
	cors = require('cors'),
	jwt = require('jsonwebtoken'),
	passportLocalMongoose = require('passport-local-mongoose');

const Pusher = require('pusher');

const app = express();
const server = http.createServer(app);

/**
 * export io for use in the Socket Manager
 */
var io = (module.exports.io = socketIO(server));

/**
 * Create the  Const for the Socket Manager
 */

// const SocketManager = require('./SocketManager');

/**
 * Pusher Configuration
 */

const pusher = new Pusher({
	appId   : '1101564',
	key     : '3af11569f88118f97cfc',
	secret  : 'e8e13c67c7c5acd1381f',
	cluster : 'ap2',
	useTLS  : true
});

/**
 * Require ENV
 */
require('dotenv').config();

/**
 *  Include and register all Models
 *    1. Loads
 *    2. Transporters
 *    3. Credits
 *    4. Users
 *    5. Proposal
 *    6. Rating
 *    7. Offer
 */

const Project = require('./models/project');
const { User } = require('./models/user');

/**
 * Include all Routes But they will be called at the very end
 *    1. Loads
 *    2. Transporters
 *    3. Credits
 *    4. Users
 *    5. Proposals
 *    6. Auth
 *    7. Dashboard
 *    8. Chatroom
 *    9. Message
 *    10. Auth
 */

const projectRoutes = require('./routes/projects');
const reviewRoutes = require('./routes/reviews');
const voteRoutes = require('./routes/votes');
const userRoutes = require('./routes/users');
const reviewersRoutes = require('./routes/reviewers');
const articleRoutes = require('./routes/articles');
const authRoutesGoogle = require('./routes/auth-routes-google');

/**
 * App Config
 * 1. Include Const Connection URI
 * 2. Connect To the Required Instance Of MongoDB
 * 3. Enabling body parser to enable the collection of data from submitted forms
 * 4. Initialize Passport  for authentication
 */

const CONNECTION_URI =
	process.env.MONGODB_URI ||
	'mongodb+srv://admin:thand0l2@cluster0.vufj9.mongodb.net/trucker-zim?retryWrites=true&w=majority';

//=========================================================================================================================================
//  GridFs Stream
// Initialize GridFS Stream > Use an existing mongodb-native db instance
// ========================================================================================================================================

let gfs;
const conn = mongoose.createConnection(CONNECTION_URI, { useNewUrlParser: true });

conn.once('open', () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');

	const messageCollection = conn.collection('messages');

	const changeStream = messageCollection.watch();

	changeStream.on('change', (change) => {
		// console.log('change is checked', change)
		if (change.operationType === 'insert') {
			const messageDetails = change.fullDocument;

			console.log(messageDetails);

			pusher.trigger('messages', 'inserted', {
				_id       : messageDetails._id,
				user      : messageDetails.user,
				content   : messageDetails.content,
				chatroom  : messageDetails.chatroom,
				status    : messageDetails.status,
				createdAt : messageDetails.createdAt
			});
		}
	});

	// console.log(changeStream);
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

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser    : true,
		useCreateIndex     : true,
		useUnifiedTopology : true,
		useFindAndModify   : false
	},
	function(err) {
		if (err) {
			console.log('There was an error in Connecting to the databases.');
		} else {
			console.log('Database Successfully Connected');
		}
	}
);

app.use(
	cookieSession({
		name   : 'session',
		keys   : [ keys.COOKIE_KEY ],
		maxAge : 24 * 60 * 60 * 100
	})
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
	);

	next();
});

/**
 * Passport Config
 */

app.use(
	session({
		secret            : process.env.SESSION_SECRET,
		resave            : false,
		saveUninitialized : true
	})
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new localStrategy(function(email, password, done) {
		User.findOne({ email: email }, async function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				console.log('User is not found');
				return done(null, false, { message: 'User is not registered.' });
			}
			try {
				if (await bcrypt.compare(password, user.password)) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Password incorrect' });
				}
			} catch (e) {
				return done(e);
			}
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findOne({ _id: id }, function(err, user) {
		done(err, user);
	});
});

// ============================================================================================================================================
//Function to ensure that all the routes are sent with:
//     1. the logged in User Data
//     2.
// ============================================================================================================================================
app.use(function(req, res, next) {
	var token = req.cookies.auth || req.headers['authorization'];

	if (token) {
		var currentUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		console.log('current ', currentUser);
		res.locals.currentUser = currentUser;
	} else {
		res.locals.currentUser = '';
	}

	next();
});

// set up cors to allow us to accept requests from our client
app.use(
	cors({
		origin      : 'http://kratos-dev.herokuapp.com',
		// origin      : 'http://localhost:3000', // allow to server to accept request from different origin
		methods     : 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials : true // allow session cookie from browser to pass through
	})
);

//============================================================================================================================================
//The Routes Have to be called last, otherwise they will not work
//They are however declared at the very top
//============================================================================================================================================
app.use(projectRoutes);
app.use(reviewRoutes);
app.use(reviewersRoutes);
app.use(voteRoutes);
app.use(userRoutes);
app.use(articleRoutes);
app.use(authRoutesGoogle);

/** 
 * Socket IO Functions
 * On socket Connection
 * Call the Socket manager that will handle all the logic to do with connections
 */

// io.on('connection', SocketManager);

if (process.env.NODE_ENV === 'production') {
	console.log('Loaded');
	app.use(express.static(path.join(__dirname, 'frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT;
server.listen(PORT, process.env.IP, function(err, message) {
	if (err) {
		console.log('There was an error in Starting the server.');
	} else {
		console.log('Server Successfully started on Port: ' + PORT);
	}
});
