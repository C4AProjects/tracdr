
'use strict';

module.exports = {
    //app name
    name:"trackDr",
    //app version
    version:"0.0.1",
    //logger config
    logger:
    {

        file:"logger/run.js",
        level:"debug", // silly | debug | verbose | info | warn | error
        logfile:'log.log'
    },
    //the Database config
    DB:{
        url:'mongodb://localhost/trackDr'
      /*  auth:
        {
            user: 'portal',
            pass: 'weenee@p0rtal'
        }*/
    },
    mailer: {
        service: 'Zoho', // Gmail, Zoho, SMTP
        auth: {
            user: 'info@buzzo.me',
            pass:  'TheBuzZ0$ap)'
        }
    }



};