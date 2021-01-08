const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new GoogleStrategy(
    {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        googleId: profile._json.sub
      
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
            name:profile._json.given_name,
            surname:profile._json.family_name,
            email:profile._json.email,
            emailVerified:profile._json.email_verified,
            googleId: profile._json.sub
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);
