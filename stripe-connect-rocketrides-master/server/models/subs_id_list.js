'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const SubsIdList = new Schema({
  car_id:Number,
});


const Subs_id = mongoose.model('Subs_id', SubsIdList);

module.exports = Subs_id;