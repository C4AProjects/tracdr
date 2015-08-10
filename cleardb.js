/**
 * Project: tracdr
 * Created by Haythem Horbit on 10/08/15.
 */
APP={};
APP.CONFIG=require("./config/config").loadConfig();

APP.LOGGER = require("./api/logger/logger");
APP.LOGGER.init(APP.CONFIG.logger);


require("./api/controllers/mailerController")(APP);


DEBUG("Loading Models....")
APP.DB={};
require("./api/models/doctor")(APP.DB);
require("./api/models/patient")(APP.DB);
require("./api/models/notification")(APP.DB);
require("./api/models/appointment")(APP.DB);

DEBUG("loading DB Module...")
require('./api/utils/connexionUtils')(APP.DB);
APP.DB.connect(APP.CONFIG.DB);
APP.DB.DOCTOR.remove({}, function(err) {
   if (err) console.log(err)
    console.log('collection removed : DOCTOR')
});
APP.DB.APPOINTMENT.remove({}, function(err) {
    if (err) console.log(err)
    console.log('collection removed : APPOINTMENT')
});
APP.DB.NOTIFICATION.remove({}, function(err) {
    if (err)  console.log(err)
    console.log('collection removed : NOTIFICATION')
});

APP.DB.PATIENT.remove({}, function(err) {
    if (err) console.log(err)
    console.log('collection removed : PATIENT')
});