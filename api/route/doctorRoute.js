/**
 * Created by haythem on 12/03/2015.
 */
var doctorCtrl=require("../controllers/doctorController")
module.exports = function (app) {
    app.post("/doctor", function(req, res){
        DEBUG("Adding Doctor")
        doctorCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,doctor:doc})

        })

    });

    app.get("/doctor", function(req, res){
        DEBUG("Getting All Doctor")
        doctorCtrl.getList(function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/doctor/:ID", function(req, res){
        DEBUG("Getting a Doctor")
        doctorCtrl.get(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.put("/doctor/:ID", function(req, res){
        DEBUG("Updating Doctor")
        doctorCtrl.update(req.params.ID,req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,doctor:doc})

        })

    });
    app.delete("/doctor/:ID", function(req, res){
        DEBUG("Deleting Doctor")
        doctorCtrl.delete(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,msg:"Doctor Deleted"})

        })

    });
}