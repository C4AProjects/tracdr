/**
 * Created by haythem on 15/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */
var authCtrl=require("../controllers/authController")
module.exports = function (app) {
    app.post("/api/register/patient", function(req, res){
        DEBUG("Register Patient")
        authCtrl.registerPatient(req.body,function(err,doc){
            if (err) res.send({error:err})
            else{
                var token = jwt.sign({userId: "2014", date:new Date()}, secret);
                res.send({success:true,patient:doc,role:"patient",token:token})
            }

        })

    });
    app.post("/api/register/doctor", function(req, res){
        DEBUG("Register Doctor")
        authCtrl.registerDoctor(req.body,function(err,doc){
            if (err) res.send({error:err})
            else{
                var token = jwt.sign({userId: "2014", date:new Date()}, secret);
                res.send({success:true,doctor:doc,role:"doctor",token:token})
            }

        })

    });
    app.post("/api/login", function(req, res){
        INFO("login")
        authCtrl.login(req.body,function(err,doc){
            if (err) res.send({error:err})
            else {
                console.log("login %j",doc)
                res.send(doc)
            }

        })

    });

    app.post("/api/forget", function(req, res){
        DEBUG("FogetPassword")
        authCtrl.forget(req.body,function(err,doc){
            if (err) res.send({error:err})
            else {
                console.log("login %j",doc)
                res.send(doc)
            }

        })

    });
}