const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const configurationSchema = new Schema({
    mam_mode: { type: String, unique: true },
    mam_provider: { type: String, unique: true }
});
  
configurationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Configuration', configurationSchema);