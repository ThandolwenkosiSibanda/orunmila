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

/**
 * Require ENV
 */
require('dotenv').config();

/**
 *  Include and register all Models
 *    1. Projects
 *    2. Votes
 *    3. User
 *    4. Article
 *    5. Report
 */

const Project = require('./models/project');
const { User } = require('./models/user');

/**
 * Include all Routes But they will be called at the very end
 *    1. Projects
 *    2. Votes
 *    3. User
 *    4. Article
 *    5. Report
 */

const projectRoutes = require('./routes/projects');
const voteRoutes = require('./routes/votes');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const reportRoutes = require('./routes/reports');
const reviewersRoutes = require('./routes/reviewers');
const authRoutesGoogle = require('./routes/auth-routes-google');

/**
 * App Config
 * 1. Include Const Connection URI
 * 2. Connect To the Required Instance Of MongoDB
 * 3. Enabling body parser to enable the collection of data from submitted forms
 * 4. Initialize Passport  for authentication
 */

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

		res.locals.currentUser = currentUser;
	} else {
		res.locals.currentUser = '';
	}

	next();
});

// set up cors to allow us to accept requests from our client
app.use(
	cors({
		// origin      : 'http://orunmila.herokuapp.com',
		origin      : 'http://localhost:3000', // allow to server to accept request from different origin
		methods     : 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials : true // allow session cookie from browser to pass througho
	})
);

//============================================================================================================================================
//The Routes Have to be called last, otherwise they will not work
//They are however declared at the very top
//============================================================================================================================================
app.use(projectRoutes);
app.use(voteRoutes);
app.use(userRoutes);
app.use(articleRoutes);
app.use(authRoutesGoogle);
app.use(reportRoutes);
app.use(reviewersRoutes);

/** 
 * Socket IO Functions
 * On socket Connection
 * Call the Socket manager that will handle all the logic to do with connections
 */

// io.on('connection', SocketManager);

if (process.env.NODE_ENV === 'production') {
	console.log('Loadeded');
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
