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
    var appointment_schema = new Schema({
        _patient: {type: Schema.Types.ObjectId, ref: 'patient'},
        _doctor: {type: Schema.Types.ObjectId, ref: 'doctor'},
        location: String,
        details: String,
        subject: String,
        startTime:Date,
        endTime:Date,
        status: String,
        created_date: {type: Date, default: Date.now},
        modified_date: {type: Date, default: Date.now}
    })

    appointment_schema.pre('save', function (next) {
        // do stuff
        this.modified_date = new Date();

        next();
    });

    backend.APPOINTMENT = mongoose.model('appointment', appointment_schema, 'appointment', true);


}