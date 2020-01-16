const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongooose = require("mongoose");
//loading user model not defining it
const User = mongooose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            const newUser = new User({ googleId: profile.id });
            newUser.save().then(user => {
              done(null, user);
            });
          }
        })
        .catch(() => {
          done({ error: "error while connecting mongodb" }, null);
        });
    }
  )
);
