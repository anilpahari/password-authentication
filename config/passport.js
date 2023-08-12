const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      userModel
        .findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Email is not registered." });
          }
          //password match
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    userModel
      .findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
