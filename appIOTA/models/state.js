const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: { type: JSON },
    hora_que_chegou: { type: String }
});

module.exports = mongoose.model('State', stateSchema);