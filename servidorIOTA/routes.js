const express = require('express');

const routes = express.Router();
const iotaController = require('./iotaController');

routes.post('/', iotaController.index);

module.exports = routes;