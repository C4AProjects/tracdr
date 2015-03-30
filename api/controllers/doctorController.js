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
        else if (usr) {  usr.remove(); cb(null, usr)}
        else {   cb( "Doctor Not Found")}
    });
}
module.exports.find=function(name,cb){

    APP.DB.DOCTOR.find({ $or:[{firstName:{$regex:new RegExp("^" + name, "i")}},{lastName:{$regex:new RegExp("^" + name, "i")}}]  }, function (er, usr){

        if (er ) cb("ERROR finding Doctor :"+er)
        else if (usr) { cb(null, usr)}
        else {   cb( "Doctor Not Found")}
    });
}
module.exports.getList=function(cb){

    APP.DB.DOCTOR.find({ }, function (er, doctors){

       cb(er, doctors)
    });
}

module.exports.getByPatient=function(docId,cb){

    APP.DB.DOCTOR.findOne({patients:docId }, function (er, doctors){

        cb(er, doctors)
    });
}
module.exports.addPatient=function(docId,patId,cb){

    APP.DB.DOCTOR.findOne({_id:docId}, function (er, doctors){
if(er) cb(er)
        if (doctors){
            if (!doctors.patients) doctors.patients=[];
                doctors.patients.push(patId)
            doctors.save();
            cb(null, doctors)
}else{
            cb("Doctor Not Found")
        }

    });
}





