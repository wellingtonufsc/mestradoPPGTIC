const express = require('express');
const productsController = require('../controllers/productsController');

const routes = express.Router();

routes.get('/:userId', productsController.getProductsByUser);
/*routes.get('/add', productsController.add);
routes.get('/delete', productsController.delete);
routes.get('/view/:id', productsController.view);*/

module.exports = routes;