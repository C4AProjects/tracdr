'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Doctor = mongoose.model('Doctor'),
  _ = require('lodash');


/**
 * Find doctor by id
 */
exports.doctor = function(req, res, next, id) {
  Doctor.load(id, function(err, doctor) {
    if (err) return next(err);
    if (!doctor) return next(new Error('Failed to load doctor ' + id));
    req.doctor = doctor;
    next();
  });
};

/**
 * Create an doctor
 */
exports.create = function(req, res) {
  var doctor = new Doctor(req.body);
  doctor.user = req.user;

  doctor.save(function(err) {
    if (err) {
      res.json(500, {
        error: 'Cannot save the doctor'
      });
    }
    res.json(doctor);

  });
};

/**
 * Update an doctor
 */
exports.update = function(req, res) {
  var doctor = req.doctor;

  doctor = _.extend(doctor, req.body);

  doctor.save(function(err) {
    if (err) {
      res.json(500, {
        error: 'Cannot update the doctor'
      });
    }
    res.json(doctor);

  });
};

/**
 * Delete an doctor
 */
exports.destroy = function(req, res) {
  var doctor = req.doctor;

  doctor.remove(function(err) {
    if (err) {
      res.json(500, {
        error: 'Cannot delete the doctor'
      });
    }
    res.json(doctor);

  });
};

/**
 * Show an doctor
 */
exports.show = function(req, res) {
  res.json(req.doctor);
};

/**
 * List of Doctors
 */
exports.all = function(req, res) {
  Doctor.find().exec(function(err, doctors) {
    if (err) {
      res.json(500, {
        error: 'Cannot list the doctors'
      });
    }
    res.json(doctors);

  });
};
