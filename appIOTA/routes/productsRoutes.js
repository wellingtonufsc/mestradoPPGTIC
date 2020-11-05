const express = require('express');
const productsController = require('../controllers/productsController');

const routes = express.Router();

routes.get('/getExisting', productsController.getAll);
routes.post('/addTangle', productsController.addProductData);
routes.post('/selectProduct', productsController.selectProduct);
routes.get('/:userId', productsController.getProductsByUser);
/*routes.get('/delete', productsController.delete);
routes.get('/view/:id', productsController.view);*/

module.exports = routes;