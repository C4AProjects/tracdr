/**
 * Created by macbookproretina on 18/04/15.
 */

var nodemailer = require('nodemailer');
var transporter ;
var MAILER = {}

MAILER.init=function(){
    INFO("Init Mailer...")
    transporter = nodemailer.createTransport(APP.CONFIG.mailer);
}

MAILER.testMail=function(){
    var mailOptions = {
        from: 'Buzzo <contact.buzzo@gmail.com>', // sender address
        to: 'haythem.horbit@gmail.com', // list of receivers
        subject: 'Buzzo', // Subject line
        // plaintext body
        html: 'Hello from <b>tracDr</b>' // html body
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send({error: error});
        } else {


        }
    });

}


MAILER.sendForgetMail=function(to,name,pass,cb){
    var mailOptions = {
        from: APP.CONFIG.mailer.auth.user, // sender address
        to: to, // list of receivers
        subject: 'trackDr', // Subject line
        // plaintext body
        html: 'Hello ' +name +'<br>Your new password is: <b>'+ pass + '</b><br><br>If you received this email by mistake, simply delete it. <br>Thankyou<br><img src="http://54.89.140.6:2014/website/images/buzzo.png" style="background-color: black">' // html body

    };


    transporter.sendMail(mailOptions, cb);

}

MAILER.sendNewPatientMail=function(to,name,patient,cb){
    var mailOptions = {
        from: APP.CONFIG.mailer.auth.user, // sender address
        to: to, // list of receivers
        subject: 'trackDr', // Subject line
        // plaintext body
        html: 'Hello ' +name +'<br>You have a new patient : <b>'+ patient + '</b><br><br>If you received this email by mistake, simply delete it. <br>Thankyou<br><img src="http://54.89.140.6:2014/website/images/buzzo.png" style="background-color: black">' // html body

    };


    transporter.sendMail(mailOptions, cb);

}

MAILER.sendActivationMail=function(to,name,link,cb){
    var mailOptions = {
        from: APP.CONFIG.mailer.auth.user, // sender address
        to: to, // list of receivers
        subject: 'trackDr', // Subject line
        // plaintext body
        html: 'Hello ' +name +'<br>Click on this link to activate your account : <a href="http://tracdr.c4asolution.com:3000/api/activate/'+link+'">Activate</a><br><br>If you received this email by mistake, simply delete it. <br>Thankyou<br><img src="http://54.89.140.6:2014/website/images/buzzo.png" style="background-color: black">' // html body

    };


    transporter.sendMail(mailOptions, cb);

}
module.exports = function (backend) {
    MAILER.init();
   // MAILER.testMail();
    backend.MAILER = MAILER
}
