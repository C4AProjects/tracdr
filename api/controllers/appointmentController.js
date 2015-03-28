/**
 * Created by haythem on 12/03/2015.
 */
var  _ = require('underscore');
module.exports.add=function(doc,cb){
    var appoint=new APP.DB.APPOINTMENT();
    appoint = _.extend(appoint, doc);
    appoint.save(function (er) {

        if (er ) cb("ERROR Saving APPOINTMENT :"+er)
        else cb(null, appoint)
    });
}


module.exports.update=function(id,doc,cb){

    APP.DB.APPOINTMENT.findOne({ _id: id }, function (er, appoint){
        _.extend(appoint, doc);
        appoint.save();
        if (er ) cb("ERROR updating APPOINTMENT :"+er)
        else cb(null, appoint)
    });
}
module.exports.get=function(id,cb){

    APP.DB.APPOINTMENT.findOne({ _id: id }, function (er, appoint){

        if (er ) cb("ERROR finding APPOINTMENT :"+er)
        else cb(null, appoint)
    });
}
module.exports.delete=function(id,cb){

    APP.DB.APPOINTMENT.findOne({ _id: id }, function (er, appoint){

        if (er ) cb("ERROR deleting APPOINTMENT :"+er)
        else if(appoint) {  appoint.remove(); cb(null, appoint)}
        else {   cb( "Appointment Not Found")}
    });
}

module.exports.getList=function(cb){

    APP.DB.APPOINTMENT.find({ }, function (er, appoints){

        cb(er, appoints)
    });
}
module.exports.getMy=function(id,cb){

    APP.DB.APPOINTMENT.find({_doctor:id}, function (er, appoints){

        cb(er, appoints)
    });
}

module.exports.getMyPAt=function(id,cb){

    APP.DB.APPOINTMENT.find({_patient:id}, function (er, appoints){

        cb(er, appoints)
    });
}
