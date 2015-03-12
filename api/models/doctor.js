/** @namespace APP.BACKEND.MODELS.ASSET
 * @memberof! APP.BACKEND.MODELS
 * */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * A module representing a jacket.
 * @module APP.BACKEND.MODELS.ASSET
 * @memberof! APP.BACKEND.MODELS
 */
module.exports = function (backend) {
    var doctor_schema = new Schema({
        email: String,
        firstName: String,
        lastName: String,

        location: String,
        phone: String,
        specialty : String,
        created_date: {type: Date, default: Date.now},
        modified_date: {type: Date, default: Date.now}
    })

    doctor_schema.pre('save', function (next) {
            // do stuff
            this.modified_date = new Date();

            next();
        });

    backend.DOCTOR = mongoose.model('doctor', doctor_schema, 'doctor', true);


}