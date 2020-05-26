'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Ride = require('./ride');
const Car = require('./car');
const Car_model = require('./car_model');
const Req_Car = require('./req_car');

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Pilot schema.
const PilotSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  type: { type: String, default: 'individual', enum: ['individual', 'company'] },

  firstName: String,
  lastName: String,
  address: String,
  postalCode: String,
  city: String,
  state: { type: String}, 
  country: { type: String, default: 'US' },
  created: { type: Date, default: Date.now },
  rocket: {
    model: String,
    license: String,
    color: String
  },
  businessName: String,

  // Stripe account ID to send payments obtained with Stripe Connect.
  stripeAccountId: String,
  car_points_pair: [{
    car_id: Number,
    partner_points: Number,
  }],
});

// Return a pilot name for display.
PilotSchema.methods.displayName = function() {
  if (this.type === 'company') {
    return this.businessName;
  } else {
    return `${this.firstName} ${this.lastName}`;
  }
};

// List rides of the past week for the pilot.
/*PilotSchema.methods.listRecentRides = function() {
  const weekAgo = Date.now() - (7*24*60*60*1000);
  return Ride.find({ pilot: this, created: { $gte: weekAgo } })
    .populate('passenger')
    .sort({ created: -1 })
    .exec();
};
*/
/*
PilotSchema.methods.listRecentRides = function() {
  Car.find({}, function(err, cars){
      if(err){
        console.log(err);
      }
      else{
        //console.log(cars);
        return cars;
      }
  });
};
*/
//The above one doesn't work but this below one does. A bit stupid but it does.
PilotSchema.methods.listRecentRides = async function() {
  var my_subs_cars = [];
  var resp_my_points = this.car_points_pair;
  console.log(resp_my_points);
  for( let car in this.car_points_pair){
    console.log('car here!');
    //console.log(car);
    //console.log(this.car_points_pair);
    //console.log(this.car_points_pair[car].car_id);
    await Car.find({'car_id': this.car_points_pair[car].car_id },async function (err, req_car){
      if(err){
        console.log(err);
      }
      console.log(car);
      console.log('Yes! I am executed');
      //console.log(resp_my_points);
      //console.log(resp_my_points[car].car_id);
      //console.log(resp_my_points[car].partner_points);
      //req_car[0].partner_points = await resp_my_points[car].partner_points;
      //Object.assign(req_car[0], {'partner_points': resp_my_points[car].partner_points});
      //console.log(req_car[0]);
      //await my_subs_cars.push(req_car[0]);
      //resp_my_points.push(this.car_points_pair[car].partner_points);
      var req_car2 = new Req_Car({
        car_id: req_car[0].car_id,
        vin_id: req_car[0].vin_id,
        mod_name: req_car[0].mod_name,
        year: req_car[0].year,
        month: req_car[0].month,
        revenue: req_car[0].revenue,
        total_points: req_car[0].total_points,
        partner_points: await resp_my_points[car].partner_points,

      });
      req_car2.save();
      console.log(req_car2);
      my_subs_cars.push(req_car2);
    });
  }
  //console.log('Your rides begin here!');
  console.log(my_subs_cars);
  return my_subs_cars;
};

// Generate a password hash (with an auto-generated salt for simplicity here).
PilotSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// Check if the password is valid by comparing with the stored hash.
PilotSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Get the first fully onboarded pilot.
PilotSchema.statics.getFirstOnboarded = function() {
  return Pilot.findOne({ stripeAccountId: { $ne: null } })
    .sort({ created: 1 })
    .exec();
};

// Get the latest fully onboarded pilot.
PilotSchema.statics.getLatestOnboarded = function() {
  return Pilot.findOne({ stripeAccountId: { $ne: null } })
    .sort({ created: -1 })
    .exec();
};

// Make sure the email has not been used.
PilotSchema.path('email').validate({
  isAsync: true,
  validator: function(email, callback) {
    const Pilot = mongoose.model('Pilot');
    // Check only when it is a new pilot or when the email has been modified.
    if (this.isNew || this.isModified('email')) {
      Pilot.find({ email: email }).exec(function(err, pilots) {
        callback(!err && pilots.length === 0);
      });
    } else {
      callback(true);
    }
  },
  message: 'This email already exists. Please try to log in instead.',
});

// Pre-save hook to ensure consistency.
PilotSchema.pre('save', function(next) {
  // Make sure certain fields are blank depending on the pilot type.
  if (this.isModified('type')) {
    if (this.type === 'individual') {
      this.businessName = null;
    } else {
      this.firstName = null;
      this.lastName = null;
    }
  }
  // Make sure the password is hashed before being stored.
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

PilotSchema.methods.startit = function() {
  const filter = {};
  var all = Pilot.find(filter);
  return all;
};

const Pilot = mongoose.model('Pilot', PilotSchema);





module.exports = Pilot;
