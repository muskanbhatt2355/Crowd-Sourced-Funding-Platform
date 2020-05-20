'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const PayoutSchema = new Schema({
  name: { type: String },
  date: { type: Date },
  amount: { type: Number },
  currency: { type: String, default: 'usd' },
  stripe_Id: { type: String },
});

const Payout = mongoose.model('Payout', PayoutSchema);

module.exports = Payout;