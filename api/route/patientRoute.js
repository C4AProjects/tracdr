/**
 * Created by haythem on 12/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */
var patientCtrl=require("../controllers/patientController")
module.exports = function (app) {
    app.post("/api/secured/patient", function(req, res){
        DEBUG("Adding patient")
        patientCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,patient:doc})

        })

    });

    app.get("/api/secured/patient", function(req, res){
        DEBUG("Getting All patient")
        patientCtrl.getList(function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/patient/:ID", function(req, res){
        DEBUG("Getting a patient")
        patientCtrl.get(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/patient/doctor/:ID", function(req, res){
        DEBUG("Getting my patientx")
        patientCtrl.getmy(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });

    app.put("/api/secured/patient/:ID", function(req, res){
        DEBUG("Updating patient")
        patientCtrl.update(req.params.ID,req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,patient:doc})

        })

    });
    app.delete("/api/secured/patient/:ID", function(req, res){
        DEBUG("Deleting patient")
        patientCtrl.delete(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,msg:"patient Deleted"})

        })

    });

    var fs = require('fs');
    var util = require('util');
    app.post("/api/patient/photo/:ID", function(req, res){

        APP.DB.PATIENT.findOne({_id:req.params.ID }, function (er, doctor){

            if (er) res.send({error:err})
            else if(doctor){
                if (req.files && req.files.file && req.files.file.name) {
                    console.log(req.files.file);
                    doctor.profilePhoto=req.files.file.name
                    doctor.save(function(err){
                        res.send({file:req.files.file.name})
                    })
                }
            }
        });

    });
}