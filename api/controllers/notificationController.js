/**
 * Created by haythem on 12/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */
var  _ = require('underscore');
module.exports.add=function(not,cb){
    var notif=new APP.DB.NOTIFICATION();
    notif = _.extend(notif, not);
    notif.save(function (er) {

        if (er ) cb("ERROR Saving Notification :"+er)
        else cb(null, notif)
    });
}


module.exports.update=function(id,doc,cb){

    APP.DB.NOTIFICATION.findOne({ _id: id }, function (er, not){
        _.extend(not, doc);
        not.save();
        if (er ) cb("ERROR updating Notification :"+er)
        else cb(null, not)
    });
}
module.exports.get=function(id,cb){

    APP.DB.NOTIFICATION.findOne({ _id: id }, function (er, not){

        if (er ) cb("ERROR finding Notification :"+er)
        else cb(null, not)
    });
}
module.exports.delete=function(id,cb){

    APP.DB.NOTIFICATION.findOne({ _id: id }, function (er, not){

        if (er ) cb("ERROR deleting Notification :"+er)
        else if (not) {  not.remove(); cb(null, not)}
        else {   cb( "Notification Not Found")}
    });
}

module.exports.getList=function(cb){

    APP.DB.NOTIFICATION.find({ }).populate('_doctor _patient _appointment','-password').exec( function (er, notifs){

        cb(er, notifs)
    });
}


