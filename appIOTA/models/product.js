const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: { type: String, required: true, unique: true },
    secret_key: { type: String },
    channel_id: { type: String }
});
  
productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);