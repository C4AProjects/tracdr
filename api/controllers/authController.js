/**
 * Created by haythem on 12/03/2015.
 */
var _ = require('underscore');
var patientCtrl = require('../controllers/patientController');
var doctortCtrl = require('../controllers/doctorController');
module.exports.registerPatient = function (doc, cb) {
    // APP.DB.APPOINTMENT();
    if (!doc.email || !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
    DEBUG("Register PAtient " + doc)
    APP.DB.DOCTOR.findOne({email: doc.email.toLowerCase()}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) cb("This email already exist");
            else {

                APP.DB.PATIENT.findOne({email: doc.email.toLowerCase()}, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) cb("This email already exist");
                        else {

var link=makeid();
                            doc.activation_code = link;
                            patientCtrl.add(doc, cb)

                            APP.MAILER.sendActivationMail(doc.email, doc.firstName, link, function (err, success) {
                                if (err) {
                                    //   cb(err);
                                }
                                if (success) {
                                    // cb(null,{success:true});
                                }
                            })


                        }
                    }


                })


            }
        }

    })
}
module.exports.registerDoctor = function (doc, cb) {
    if (!doc.email || !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
    DEBUG("Register PAtient " + doc)
    APP.DB.DOCTOR.findOne({email: doc.email.toLowerCase()}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) cb("This email already exist");
            else {

                APP.DB.PATIENT.findOne({email: doc.email.toLowerCase()}, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) cb("This email already exist");
                        else {
///activated:{type:Boolean, default:false},
                            //activation_link:String,
                            var link = makeid()
                            doc.activation_code = link;
                            doctortCtrl.add(doc, cb)

                            APP.MAILER.sendActivationMail(doc.email, doc.firstName, link, function (err, success) {
                                if (err) {
                                    //   cb(err);
                                }
                                if (success) {
                                    // cb(null,{success:true});
                                }
                            })


                        }
                    }


                })


            }
        }

    })

}
module.exports.login = function (doc, cb) {
    if (!doc.email && !doc.password) {
        cb("Please Fill Password, email and userName");
        return;
    }
    if (!doc.email)  doc.email = "";

    DEBUG("Register PAtient " + doc)
    APP.DB.DOCTOR.findOne({
        email: doc.email.toLowerCase(),
        password: doc.password.toLowerCase()
    }, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) {

                if (!doctor.activated) {
                    cb("Please Activate Your Account, Check your Email.")
                }
                else {
                    var token = jwt.sign({id: doctor._id, date: new Date()}, secret);
                    cb(null, {doctor: doctor, role: "doctor", token: token});
                }

            }
            else {

                APP.DB.PATIENT.findOne({
                    email: doc.email.toLowerCase(),
                    password: doc.password.toLowerCase()
                }, function (errFindPatient, patient) {
                    if (errFindPatient) {
                        cb(errFindPatient)
                    }
                    else {
                        if (patient) {

                            if (!patient.activated) {
                                cb("Please Activate Your Account, Check your Email.")
                            }
                            else {

                                var token = jwt.sign({id: patient._id, date: new Date()}, secret);
                                cb(null, {patient: patient, role: "patient", token: token});
                            }

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
    if (!doc.email) {
        cb("Please Fill your email");
        return;
    }
    APP.DB.DOCTOR.findOne({email: doc.email.toLowerCase()}, function (errFindDoctor, doctor) {
        if (errFindDoctor) {
            cb(errFindDoctor)
        }
        else {
            if (doctor) {
                var pass = makePass();
                doctor.password = pass;
                doctor.save(function (errSaveDoc) {
                    if (errSaveDoc) {
                        cb(errSaveDoc)
                    } else {
                        APP.MAILER.sendForgetMail(doctor.email, doctor.firstName, pass, function (err, success) {
                            if (err) {
                                cb(err);
                            }
                            if (success) {
                                cb(null, {success: true});
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

                            var pass = makePass();
                            patient.password = pass;
                            patient.save(function (errSaveDoc) {
                                if (errSaveDoc) {
                                    cb(errSaveDoc)
                                } else {
                                    APP.MAILER.sendForgetMail(patient.email, patient.firstName, pass, function (err, success) {
                                        if (err) {
                                            cb(err);
                                        }
                                        if (success) {
                                            cb(null, {success: true});
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

module.exports.activate = function (code, cb) {
    console.log(code)
    APP.DB.PATIENT.findOne({activation_code: code.toString()}, function (errPat, pat) {
        console.log(pat)
        if (pat) {
            pat.activated = true;
            pat.save()
            cb(null)
        } else {
            APP.DB.DOCTOR.findOne({activation_code: code.toString()}, function (errDoc, doc) {
                console.log(doc)
                if (doc) {
                    doc.activated = true;
                    doc.save()
                    cb(null)
                } else {
                    cb("Invalid Activation Code")
                }
            })
        }
    })
}
var makePass = function () {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}