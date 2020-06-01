'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const ReqCarSchema = new Schema({
  car_id:{ type: Number, unique: false },
  vin_id: String,
  mod_name: String,
  year: Number,
  month: String,
  revenue: Number,
  total_points: Number,
  partner_points: Number,
});

// Return the ride amount for the pilot after collecting 20% platform fees.
//RideSchema.methods.amountForPilot = function() {
//  return parseInt(((this.amount - this.management_fee)*this.partner_points)/this.total_points);
//};

//RideSchema.methods.amountForPilot = function() {
//  return parseInt(this.amount * 0.8);
//};


/*CarSchema.methods.view_cars = function() {
  const filter = {};
  var all = Car.find(filter);
  return all;
};
*/

ReqCarSchema.methods.amountForPilot = function() {
  return parseInt((this.revenue - 175)*(this.partner_points/this.total_points));
};


const Req_Car = mongoose.model('Req_Car', ReqCarSchema);

module.exports = Req_Car;