/**
 * Created by haythem on 12/03/2015.
 */
var _ = require('underscore');
var patientCtrl = require('../controllers/patientController');
var doctortCtrl = require('../controllers/doctorController');
module.exports.registerPatient = function (doc, cb) {
    // APP.DB.APPOINTMENT();
    if (!doc.email || !doc.userName || !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
    DEBUG("Register PAtient " + doc)
    APP.DB.DOCTOR.findOne({$or: [{email: doc.email.toLowerCase()}, {userName: doc.userName.toLowerCase()}]}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) cb("This email already exist");
            else {

                APP.DB.PATIENT.findOne({$or: [{email: doc.email.toLowerCase()}, {userName: doc.userName.toLowerCase()}]}, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) cb("This email already exist");
                        else {

                            patientCtrl.add(doc, cb)


                        }
                    }


                })


            }
        }

    })
}
module.exports.registerDoctor = function (doc, cb) {
    if (!doc.email || !doc.userName || !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
    DEBUG("Register PAtient " + doc)
    APP.DB.DOCTOR.findOne({$or: [{email: doc.email.toLowerCase()}, {userName: doc.userName.toLowerCase()}]}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) cb("This email already exist");
            else {

                APP.DB.PATIENT.findOne({$or: [{email: doc.email.toLowerCase()}, {userName: doc.userName.toLowerCase()}]}, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) cb("This email already exist");
                        else {

                            doctortCtrl.add(doc, cb)


                        }
                    }


                })


            }
        }

    })

}
module.exports.login = function (doc, cb) {
    if ((!doc.email || !doc.userName) && !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
    if (! doc.email)  doc.email="";
    if (! doc.userName)  doc.userName="";
    DEBUG("Register PAtient " + doc)
    APP.DB.DOCTOR.findOne({$or: [{email: doc.email.toLowerCase()}, {userName: doc.userName.toLowerCase()}],password:doc.password.toLowerCase()}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) {


                var token = jwt.sign({id: doctor._id, date:new Date()}, secret);
                cb(null,{doctor:doctor,role:"doctor",token:token});
            }
            else {

                APP.DB.PATIENT.findOne({$or: [{email: doc.email.toLowerCase()}, {userName: doc.userName.toLowerCase()}],password:doc.password.toLowerCase()}, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) {

                            var token = jwt.sign({id: patient._id, date:new Date()}, secret);
                            cb(null,{patient:patient,role:"patient",token:token});
                        }
                        else {

                            cb("Verify your Login and password");


                        }
                    }


                })


            }
        }

    })
}
module.exports.forget = function (doc, cb) {
    if (!doc.email ) {
        cb("Please Fill your email");
        return;
    }
    APP.DB.DOCTOR.findOne({email: doc.email.toLowerCase()}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) {
                var pass=makePass();
                doctor.password=pass;
                doctor.save(function(errSaveDoc){
                    if (errSaveDoc){
                        cb(errSaveDoc)
                    }else{
                        APP.MAILER.sendForgetMail(doctor.email,doctor.firstName,pass,function(err,success){
                            if(err){
                                cb(err);
                            }
                            if(success){
                                cb(null,{success:true});
                            }
                        })
                    }
                });


            }
            else {

                APP.DB.PATIENT.findOne({email: doc.email.toLowerCase()}, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) {

                            var pass=makePass();
                            patient.password=pass;
                            patient.save(function(errSaveDoc){
                                if (errSaveDoc){
                                    cb(errSaveDoc)
                                }else{
                                    APP.MAILER.sendForgetMail(patient.email,patient.firstName,pass,function(err,success){
                                        if(err){
                                            cb(err);
                                        }
                                        if(success){
                                            cb(null,{success:true});
                                        }
                                    })
                                }
                            });
                        }
                        else {

                            cb("This Mail doesn't exist");


                        }
                    }


                })


            }
        }

    })
    console.log(doc)
}
var makePass=function ()
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}