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
    if (!doc.email || !doc.userName || !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
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
    // APP.DB.APPOINTMENT();
    console.log(doc)
}