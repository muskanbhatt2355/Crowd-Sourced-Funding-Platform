'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const CarSchema = new Schema({
  car_id: { type: Number, unique: true},
  vin_id: { type: String , minlength: 17, maxlength: 17},
  mod_name: { type: String, default: 'Toyota Corolla' },
  month: { type: String, default: 'January' },
  revenue: { type: Number, default: '500' },
});

// Return the ride amount for the pilot after collecting 20% platform fees.
//RideSchema.methods.amountForPilot = function() {
//  return parseInt(((this.amount - this.management_fee)*this.partner_points)/this.total_points);
//};

//RideSchema.methods.amountForPilot = function() {
//  return parseInt(this.amount * 0.8);
//};


CarSchema.methods.view_cars = function() {
  const filter = {};
  var all = Car.find(filter);
  return all;
};

CarSchema.methods.amountForPilot = function() {
  return parseInt(this.revenue - 175);
};


const Car = mongoose.model('Car', CarSchema);

module.exports = Car;