const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    user_id: { type: String },
    mamState: { type: JSON },
    first_root: { type: String },
    device_id: { type: String, unique: true },
    name: { type: String },
    destination: { type: String }
});
  
productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);