// #1
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

// #2
    app.use(passport.initialize());
    app.use(passport.session());

// #3
    passport.use(new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      console.log("at use passport");
      User.findOne({
        where: { email }
      })
      .then((user) => {
        if (!user || !authHelper.comparePass(password, user.password)) {
          console.log("invalid");
        //  return done(null, false, { message: "Invalid email or password" });
          return done(null, user);
        }
        console.log("valid");
        return done(null, user);
      })
    }));

    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
      User.findById(id)
      .then((user) => {
        callback(null, user);
      })
      .catch((err =>{
        callback(err, user);
      }))

    });
  }
}
