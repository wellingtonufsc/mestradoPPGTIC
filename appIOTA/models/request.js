const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    request: { type: JSON },
});

module.exports = mongoose.model('Request', requestSchema);