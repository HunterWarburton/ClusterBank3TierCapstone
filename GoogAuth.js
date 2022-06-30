const passport = require('passport');
require('dotenv').config();

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOG_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOG_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://huntwar-bank3tier.herokuapp.com/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
        userProfile = profile;
      return done(null, profile);
   
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);

});

passport.deserializeUser(function(user, done) {
    done(null, user);

});