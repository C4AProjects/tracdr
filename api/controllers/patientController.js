/**
 * Created by haythem on 12/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */
var  _ = require('underscore');
module.exports.add=function(pat,cb){
    var patient=new APP.DB.PATIENT();
    patient = _.extend(patient, pat);
    patient.save(function (er) {

        if (er ) cb("ERROR Saving Patient :"+er)
        else cb(null, patient)
    });
}


module.exports.update=function(id,doc,cb){

    APP.DB.PATIENT.findOne({ _id: id }, function (er, pat){
        _.extend(pat, doc);
        pat.save();
        if (er ) cb("ERROR updating Patient :"+er)
        else cb(null, pat)
    });
}
module.exports.get=function(id,cb){

    APP.DB.PATIENT.findOne({ _id: id }, function (er, pat){

        if (er ) cb("ERROR finding Patient :"+er)
        else cb(null, pat)
    });
}
module.exports.getmy=function(id,cb){

    APP.DB.DOCTOR.findOne({ _id: id }).populate('patients','-password').exec( function (er, pat){

        if (er ) cb("ERROR finding Patient :"+er)
        else cb(null, pat.patients)
    });

}
module.exports.delete=function(id,cb){

    APP.DB.PATIENT.findOne({ _id: id }, function (er, pat){

        if (er ) cb("ERROR deleting Patient :"+er)
        else if(pat) {  pat.remove(); cb(null, pat)}
        else {   cb( "Patient Not Found")}
    });
}

module.exports.getList=function(cb){

    APP.DB.PATIENT.find({ }, function (er, patients){

        cb(er, patients)
    });
}


