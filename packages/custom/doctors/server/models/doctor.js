'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
          _   = require('lodash');

/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

/**
 * Doctor Schema
 */

var DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
    get: escapeProperty
  },
  speciality: String,
  phone: String,
  address: {
      street: String,
      city: String,
      state: String,
      geoloc:[]
  }
});

mongoose.model('Doctor', DoctorSchema);
