/**
 * Created by haythem on 12/03/2015.
 */
APP={};
APP.CONFIG=require("./config/config").loadConfig();

APP.LOGGER = require("./api/logger/logger");
APP.LOGGER.init(APP.CONFIG.logger);

INFO("Starting API")
APP.LOGGER = require("./api/api");

DEBUG("Loading Models....")
APP.DB={};
require("./api/models/doctor")(APP.DB);


DEBUG("loading DB Module...")
require('./api/utils/connexionUtils')(APP.DB);
APP.DB.connect(APP.CONFIG.DB);