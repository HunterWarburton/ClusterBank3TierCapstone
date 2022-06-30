const passport = require('passport');
require('dotenv').config();

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = "595295551043-45qsecbu7sjak6l9jg2efm3junopj33k.apps.googleusercontent.com;
const GOOGLE_CLIENT_SECRET = "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";

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