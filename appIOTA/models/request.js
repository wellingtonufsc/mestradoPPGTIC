const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    request: { type: JSON },
    hora_que_chegou: { type: String }
});

module.exports = mongoose.model('Request', requestSchema);