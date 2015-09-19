/**
 * Created by haythem on 12/03/2015.
 */

var notifCtrl=require("../controllers/notificationController")
var appointmentCtrl=require("../controllers/appointmentController")
module.exports = function (app) {
    app.post("/api/secured/appointment", function(req, res){
        DEBUG("Adding Appointment")
        appointmentCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else{
                res.send({success:true, appointment:doc})
                var  notification={
                    _patient:doc._patient,
                    _doctor:doc._doctor,
                    _to:doc._patient,
                    _appointment:doc._id,
                    details: "The Doctor has added a new Appointment",
                    subject: "Appointment Added"
                }
                notifCtrl.add(notification,function(er,re){
                    //if (er) console.log(er)
                   // else console.log(re)
                })

                console.log(doc)


                APP.DB.PATIENT.findOne({_id:doc._patient}, function (errPat, pat) {

                    if (pat){
                        APP.MAILER.sendAddAppMail(pat.email, pat.firstName, doc.subject,doc.details,doc.endTime, function (err, success) {
                            if (err) {
                               console.log(err)
                            }
                            if (success) {
                                console.log(success)
                            }
                        })
                    }

                })

            }

        })

    });

    app.get("/api/secured/appointment", function(req, res){
        DEBUG("Getting All Appointment")
        appointmentCtrl.getList(function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/appointment/doctor/:ID", function(req, res){
        DEBUG("Getting my Appointment")
        appointmentCtrl.getMy(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/appointment/doctor1/:ID", function(req, res){
        DEBUG("Getting my Appointment")
        appointmentCtrl.getMy1(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/appointment/patient/:ID", function(req, res){
        DEBUG("Getting my Appointment")
        appointmentCtrl.getMyPAt(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });

    app.get("/api/secured/appointment/:ID", function(req, res){
        DEBUG("Getting a Appointment")
        appointmentCtrl.get(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.put("/api/secured/appointment/:ID", function(req, res){
        DEBUG("Updating Appointment")
        appointmentCtrl.update(req.params.ID,req.body,function(err,doc){
            if (err) res.send({error:err})
            else{
                res.send({success:true, appointment:doc})

                var  notification={
                    _patient:doc._patient,
                    _doctor:doc._doctor,
                    _to:doc._patient,
                    _appointment:doc._id,
                    details: "The Doctor has updated your Appointment",
                    subject: "Appointment Updated"
                }
                notifCtrl.add(notification,function(er,re){
                    if (er) console.log(er)
                    else console.log(re)
                })


                APP.DB.PATIENT.findOne({_id:doc._patient}, function (errPat, pat) {

                    if (pat){
                        APP.MAILER.sendUpdateAppMail(pat.email, pat.firstName, doc.subject,doc.details,doc.endTime,doc.status, function (err, success) {
                            if (err) {
                                console.log(err)
                            }
                            if (success) {
                                console.log(success)
                            }
                        })
                    }

                })
            }

        })

    });
    app.delete("/api/secured/appointment/:ID", function(req, res){
        DEBUG("Deleting Appointment")
        appointmentCtrl.delete(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,msg:"Appointment Deleted"})

        })

    });
}