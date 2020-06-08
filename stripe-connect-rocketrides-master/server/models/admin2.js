'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const Admin2Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
});

const Admin2 = mongoose.model('Admin2', Admin2Schema);

module.exports = Admin2;