'use strict';
var patients = require('../controllers/patients');

// The Package is past automatically as first parameter
module.exports = function(Patients, app, auth, database) {

  app.route('/v1/patients/:userId')
    .post(patients.specifyDoctors);
};
