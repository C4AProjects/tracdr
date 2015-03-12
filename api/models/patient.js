/**
 * Created by haythem on 12/03/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

patient_schema = new Schema({
    email: String,
    firstName: String,
    lastName: String,

    location: String,
    phone: String,
    gender : String,
    dateOfBirth:Date,
    created_date: {type: Date, default: Date.now},
    modified_date: {type: Date, default: Date.now}
})
module.exports = function (backend) {


    patient_schema.pre('save', function (next) {
        // do stuff
        this.modified_date = new Date();

        next();
    });

    backend.PATIENT = mongoose.model('patient', patient_schema, 'patient', true);


}