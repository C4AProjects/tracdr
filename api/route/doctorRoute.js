/**
 * Created by haythem on 12/03/2015.
 */
var doctorCtrl=require("../controllers/doctorController")
var notifCtrl=require("../controllers/notificationController")
module.exports = function (app) {
    app.post("/api/secured/doctor", function(req, res){
        DEBUG("Adding Doctor")
        doctorCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,doctor:doc})

        })

    });
    app.post("/api/secured/doctor/:patId", function(req, res){
        DEBUG("Adding Doctor")
        doctorCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else {
                doctorCtrl.addPatient(doc._id,req.params.patId,function(err1,doc1){
                    if (err1) res.send({error:err1})
                    else  res.send({success:true,doctor:doc})
                })

            }

        })

    });
    app.post("/api/secured/doctor/:docID/patien/:patientID", function(req, res){
        DEBUG("Adding Doctor")
        doctorCtrl.addPatient(req.params.docID,req.params.patientID,function(err,doc){
            if (err) res.send({error:err})
            else{
                res.send({success:true});
                /*
                 var notification_schema = new Schema({
                 _patient: {type: Schema.Types.ObjectId, ref: 'patient'},
                 _doctor: {type: Schema.Types.ObjectId, ref: 'doctor'},
                 details: String,
                 subject: String,
                 startTime:{type: Date},
                 endTime:{type: Date},
                 created_date: {type: Date, default: Date.now},
                 modified_date: {type: Date, default: Date.now}
                 })
                 */
              var  notification={
                  _patient:req.params.patientID,
                  _doctor:req.params.docID,
                  _to:req.params.docID,
                  details: "A new patient has joined you on TrackDr",
                  subject: "New Patient"
                }
                notifCtrl.add(notification,function(er,re){
                    if (er) console.log(er)
                    else console.log(re)
                })
            }

        })

    });
    app.post("/api/secured/doctor/find/:name", function(req, res){
        DEBUG("Find Doctor")
        doctorCtrl.find(req.params.name,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,doctor:doc})

        })

    });
    app.get("/api/secured/doctor", function(req, res){
        DEBUG("Getting All Doctor")
        doctorCtrl.getList(function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/doctor/:ID", function(req, res){
        DEBUG("Getting a Doctor")
        doctorCtrl.get(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.put("/api/secured/doctor/:ID", function(req, res){
        DEBUG("Updating Doctor")
        doctorCtrl.update(req.params.ID,req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,doctor:doc})

        })

    });
    app.delete("/api/secured/doctor/:ID", function(req, res){
        DEBUG("Deleting Doctor")
        doctorCtrl.delete(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,msg:"Doctor Deleted"})

        })

    });
}