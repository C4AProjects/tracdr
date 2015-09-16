
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

 doctor_schema = new Schema({
    email: {type:String,lowercase: true, trim: true},
    firstName: String,
    lastName: String,
     userName: {type:String,lowercase: true, trim: true},
     password:{type:String,lowercase: true, trim: true},
     country: String,
     state: String,
     postcode: String,
     kinphone: String,
     phone: String,
     hospital: String,
     specialty : String,
     dateOfBirth:Date,
     profilePhoto:String,
     activated:{type:Boolean, default:false},
     activation_code:String,
     patients : [{type: Schema.Types.ObjectId, ref: 'patient'}],
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