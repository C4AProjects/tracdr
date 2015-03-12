/**
 * Created by haythem on 12/03/2015.
 */
var appointmentCtrl=require("../controllers/appointmentController")
module.exports = function (app) {
    app.post("/appointment", function(req, res){
        DEBUG("Adding Appointment")
        appointmentCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true, appointment:doc})

        })

    });

    app.get("/appointment", function(req, res){
        DEBUG("Getting All Appointment")
        appointmentCtrl.getList(function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/appointment/:ID", function(req, res){
        DEBUG("Getting a Appointment")
        appointmentCtrl.get(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.put("/appointment/:ID", function(req, res){
        DEBUG("Updating Appointment")
        appointmentCtrl.update(req.params.ID,req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true, appointment:doc})

        })

    });
    app.delete("/appointment/:ID", function(req, res){
        DEBUG("Deleting Appointment")
        appointmentCtrl.delete(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,msg:"Appointment Deleted"})

        })

    });
}