/**
 * Created by haythem on 12/03/2015.
 */
APP={};
APP.CONFIG=require("./config/config").loadConfig();

APP.LOGGER = require("./api/logger/logger");
APP.LOGGER.init(APP.CONFIG.logger);
APP.UPLOAD_DIR=__dirname + "/uploads/";

require("./api/controllers/mailerController")(APP);


DEBUG("Loading Models....")
APP.DB={};
require("./api/models/doctor")(APP.DB);
require("./api/models/patient")(APP.DB);
require("./api/models/notification")(APP.DB);
require("./api/models/appointment")(APP.DB);

DEBUG("loading DB Module...")
require('./api/utils/connexionUtils')(APP.DB);

INFO("Starting API")
require("./api/api");
APP.DB.connect(APP.CONFIG.DB);