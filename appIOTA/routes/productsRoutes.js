const express = require('express');
const productsController = require('../controllers/productsController');

const routes = express.Router();

routes.get('/getExisting', productsController.getAll);
routes.post('/addTangle', productsController.addProductData);
routes.post('/selectProduct', productsController.selectProduct);
routes.get('/loadConfig', productsController.loadConfig);
routes.get('/view/:productId', productsController.view);
routes.get('/:userId', productsController.getProductsByUser);

module.exports = routes;