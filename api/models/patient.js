/**
 * Created by haythem on 12/03/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

patient_schema = new Schema({
    email: {type:String,lowercase: true, trim: true},
    firstName: String,
    lastName: String,
    userName: {type:String,lowercase: true, trim: true},
    password:{type:String,lowercase: true, trim: true},
    location: String,
    phone: String,
    gender : String,
    dateOfBirth:String,//Date
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