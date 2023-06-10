import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;

const db = require("../models");
require("dotenv").config();

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
    },
    (email: string, password: string, done: any) => {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email,
        },
      }).then((dbUser: any) => {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.CLIENT_ID_FB,
//       clientSecret: process.env.CLIENT_SECRET_FB,
//       callbackURL:
//         "https://findtherestaurant500.herokuapp.com/auth/facebook/callback",
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       db.User.findOrCreate({ where: { facebookId: profile.id } }).then(
//         function(user) {
//           return cb(null, user);
//         },
//         function(err) {
//           return cb(err);
//         }
//       );
//     }
//   )
// );
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj: any, cb) => {
  cb(null, obj);
});
// console.log(passport);
// Exporting our configured passport
export default passport;
