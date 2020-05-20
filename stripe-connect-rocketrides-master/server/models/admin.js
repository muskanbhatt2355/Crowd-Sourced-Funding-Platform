'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Ride = require('./ride');

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Pilot schema.
const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Generate a password hash (with an auto-generated salt for simplicity here).
AdminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// Check if the password is valid by comparing with the stored hash.
AdminSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Make sure the email has not been used.
AdminSchema.path('email').validate({
  isAsync: true,
  validator: function(email, callback) {
    const Admin = mongoose.model('Admin');
    // Check only when it is a new pilot or when the email has been modified.
    if (this.isNew || this.isModified('email')) {
      Admin.find({ email: email }).exec(function(err, admins) {
        callback(!err && admins.length === 0);
      });
    } else {
      callback(true);
    }
  },
  message: 'This email already exists. Please try to log in instead.',
});

// Pre-save hook to ensure consistency.
AdminSchema.pre('save', function(next) {
  // Make sure the password is hashed before being stored.
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

AdminSchema.methods.startit = function() {
  const filter = {};
  var all = Admin.find(filter);
  return all;
};

const Admin = mongoose.model('Admin', AdminSchema);





module.exports = Admin;
