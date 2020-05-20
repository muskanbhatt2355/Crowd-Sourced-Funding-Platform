const config = require('../../config');
const stripe = require('stripe')(config.stripe.secretKey);
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Pilot = require('../../models/pilot');
const Ride = require('../../models/ride');
const Car = require('../../models/car');
const Passenger = require('../../models/passenger');




// Create an instance of model SomeModel
var new_car = new Car({ car_id: 10, mod_name: 'Ford Mustang', month: 'February', revenue: 400 });

// Save the new model instance, passing a callback
new_car.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

var new_car = new Car({ car_id: 11, mod_name: 'Toyota', month: 'january', revenue: 550 });

// Save the new model instance, passing a callback
new_car.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

//const filter = {};
//  var all = Car.find(filter);
//  console.log(all);

