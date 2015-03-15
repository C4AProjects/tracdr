
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

 doctor_schema = new Schema({
    email: {type:String,lowercase: true, trim: true},
    firstName: String,
    lastName: String,
     userName: {type:String,lowercase: true, trim: true},
     password:{type:String,lowercase: true, trim: true},
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