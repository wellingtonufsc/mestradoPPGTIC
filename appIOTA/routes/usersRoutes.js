const express = require('express');
const usersController = require('../controllers/usersController');

const routes = express.Router();

routes.get('/', usersController.getAll);
routes.post('/add', usersController.add);
/*routes.delete('/delete', usersController.delete);*/
routes.get('/view/:userId', usersController.view);
routes.post('/login', usersController.login);

module.exports = routes;