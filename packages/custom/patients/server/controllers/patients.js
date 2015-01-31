'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('lodash');


/**
 * Specify doctors for a patient
 */
exports.specifyDoctors = function(req, res){
    var user = req.profile,
    list = req.body; // should return list id of doctors
    list.forEach(function(doc){
        user.doctors.push(doc);
    });
}


/**
 * Find patient by id
 */
exports.user = function(req, res, next, id) {
  User.load(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load user ' + id));
    req.user = user;
    next();
  });
};

