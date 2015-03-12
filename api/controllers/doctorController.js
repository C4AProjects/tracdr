var  _ = require('underscore');
module.exports.add=function(doc,cb){
    var doctor=new APP.DB.DOCTOR();
    doctor = _.extend(doctor, doc);
    doctor.save(function (er) {

        if (er ) cb("ERROR Saving Doctor :"+er)
        else cb(null, doctor)
    });
}


module.exports.update=function(id,doc,cb){

    APP.DB.DOCTOR.findOne({ _id: id }, function (er, usr){
        _.extend(usr, doc);
        usr.save();
        if (er ) cb("ERROR updating Doctor :"+er)
        else cb(null, usr)
    });
}
module.exports.get=function(id,cb){

    APP.DB.DOCTOR.findOne({ _id: id }, function (er, usr){

        if (er ) cb("ERROR finding Doctor :"+er)
        else cb(null, usr)
    });
}
module.exports.delete=function(id,cb){

    APP.DB.DOCTOR.findOne({ _id: id }, function (er, usr){

        if (er ) cb("ERROR deleting Doctor :"+er)
        else {  usr.remove(); cb(null, usr)}
    });
}

module.exports.getList=function(cb){

    APP.DB.DOCTOR.find({ }, function (er, doctors){

       cb(er, doctors)
    });
}


