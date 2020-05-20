'use strict';

const config = require('../../config');
const stripe = require('stripe')(config.stripe.secretKey);
const express = require('express');
const app = express();
const router = express.Router();
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}


const user = {
  username: 'test@gmail.com',
  password: 'muskan',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})


router.get('/adlogin', (req, res) => {
  res.render('adlogin');
  //res.send('my name is muskan');
});

/*router.post(
  '/adlogin',
  passport.authenticate('adlogin', {
    successRedirect: '/pilots/signup',
    failureRedirect: '/pilots/login',
  })
);
*/

router.post('/adlogin', function(req, res) {
    if (req.method == 'POST') {
        
            if((req.body.username == user.username)&&(req.body.password==user.password)){
              return res.redirect('../../cars/car_dash');
              res.send('login successfull');
              console.log('login success');
            }
            else{
              res.send('Incorrect email or password!');
              //return res.redirect('../../');
              /*return res.redirect('../../pilots/login');
              res.send('unsuccessfull');
              console.log('login failure');
              console.log(req.body.username);
              console.log(user.username);
              console.log(req.body.password);
              console.log(user.password);
              */
            }
        
    }
});



/*passport.use(new LocalStrategy(
 (username, password, done) => {
    findUser(username, (err, user) => {
      if (err) {
        return done(err)
      }

      // User not found
      if (!user) {
        return done(null, false)
      }
      // Always use hashed passwords and fixed time comparison
      bcryptjs.compare(password, user.passwordHash, (err, isValid) => {
        if (err) {
          return done(err)
        }
        if (!isValid) {
          return done(null, false)
        }

        return done(null, user)
      })
    })
  }
))
*/

//app.get('/profile', passport.authenticationMiddleware(), renderProfile);

router.get('/adlogout', (req, res) => {
  res.render('index');
  //res.send('my name is muskan');
});

module.exports = router;
