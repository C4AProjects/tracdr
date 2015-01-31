'use strict';

// The Package is past automatically as first parameter
module.exports = function(Doctors, app, auth, database) {

 ///API ENDPOINTS
 var doctors = require('../controllers/doctors');
 app.route('/v1/doctors')
    .get(doctors.all)
    .post(doctors.create);
  app.route('/v1/doctors/:doctorId')
    .get(doctors.show)
    .put(doctors.update)
    .delete(doctors.destroy);
    
  // Setting up the doctorId param
  
  app.param('doctorId', doctors.diet);
};
