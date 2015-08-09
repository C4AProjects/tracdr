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
}