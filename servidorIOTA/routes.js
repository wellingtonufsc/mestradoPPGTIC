const express = require('express');

const routes = express.Router();
const iotaController = require('./controllers/iotaController');
const mamController = require('./controllers/mamController');

routes.post('/', iotaController.index);
routes.post('/mam', mamController.sendMessage);

module.exports = routes;