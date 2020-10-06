const express = require('express');
const usersController = require('../controllers/usersController');

const routes = express.Router();

routes.get('/', usersController.getAll);
routes.post('/add', usersController.add);
/*routes.delete('/delete', usersController.delete);
routes.get('/view/:id', usersController.view);
routes.post('/login', usersController.view);*/

module.exports = routes;