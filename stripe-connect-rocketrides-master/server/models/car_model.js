'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const CarModelSchema = new Schema({
  vin_id: { type: String, unique: true },
  mod_name: { type: String, default: 'Toyota Corolla' },
  total_points: { type: Number, default: '20000'},
});

// Return the ride amount for the pilot after collecting 20% platform fees.
//RideSchema.methods.amountForPilot = function() {
//  return parseInt(((this.amount - this.management_fee)*this.partner_points)/this.total_points);
//};

//RideSchema.methods.amountForPilot = function() {
//  return parseInt(this.amount * 0.8);
//};


const Car_model = mongoose.model('Car_model', CarModelSchema);

module.exports = Car_model;