
/**
 * Created by haythem on 12/03/2015.
 */
var notifCtrl=require("../controllers/notificationController")
module.exports = function (app) {
    app.post("/api/secured/notification", function(req, res){
        DEBUG("Adding notification")
        notifCtrl.add(req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,notification:doc})

        })

    });

    app.get("/api/secured/notification", function(req, res){
        DEBUG("Getting All notification")
        notifCtrl.getList(function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.get("/api/secured/notification/:ID", function(req, res){
        DEBUG("Getting a notification")
        notifCtrl.get(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send(doc)

        })

    });
    app.put("/api/secured/notification/:ID", function(req, res){
        DEBUG("Updating notification")
        notifCtrl.update(req.params.ID,req.body,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,notification:doc})

        })

    });
    app.delete("/api/secured/notification/:ID", function(req, res){
        DEBUG("Deleting notification")
        notifCtrl.delete(req.params.ID,function(err,doc){
            if (err) res.send({error:err})
            else res.send({success:true,msg:"notification Deleted"})

        })

    });
}