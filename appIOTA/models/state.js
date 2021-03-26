const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: { type: JSON },
});

module.exports = mongoose.model('State', stateSchema);