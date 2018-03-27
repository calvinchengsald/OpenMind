const userQueries = require("../db/queries.users.js");
const passport = require("passport");


module.exports = {
  signUp(req, res, next){
    res.render("users/sign_up");
  },

  create(req, res, next){
     let newUser = {
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };
     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/sign_up");
       } else {
         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       }
     });
  },
  signIn(req, res, next){

    console.log("i am here before!");
    passport.authenticate("local")(req, res, function () {
      console.log("i am here!");
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
        console.log("i am here failed!");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
        console.log("i am here passed!");
      }
    })
  },
  signInForm(req, res, next){
    res.render('users/sign_in');
  },

  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },


}
