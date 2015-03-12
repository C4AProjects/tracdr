
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

 doctor_schema = new Schema({
    email: String,
    firstName: String,
    lastName: String,

    location: String,
    phone: String,
    specialty : String,
    created_date: {type: Date, default: Date.now},
    modified_date: {type: Date, default: Date.now}
})
module.exports = function (backend) {


    doctor_schema.pre('save', function (next) {
            // do stuff
            this.modified_date = new Date();

            next();
        });

    backend.DOCTOR = mongoose.model('doctor', doctor_schema, 'doctor', true);


}