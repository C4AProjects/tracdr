/**
 * Created by haythem on 12/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */
/**
 * Created by haythem on 12/03/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


module.exports = function (backend) {
    var notification_schema = new Schema({
        _patient: {type: Schema.Types.ObjectId, ref: 'patient'},
        _doctor: {type: Schema.Types.ObjectId, ref: 'doctor'},
        details: String,
        subject: String,
        _to:String,
        _appointment:{type: Schema.Types.ObjectId, ref: 'appointment'},
        startTime:{type: Date},
        endTime:{type: Date},
        created_date: {type: Date, default: Date.now},
        modified_date: {type: Date, default: Date.now}
    })

    notification_schema.pre('save', function (next) {
        // do stuff
        this.modified_date = new Date();
        next();
    });

    backend.NOTIFICATION = mongoose.model('notification', notification_schema, 'notification', true);


}