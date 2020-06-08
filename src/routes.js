const { Router } = require('express');
const routes = Router();

const PointsController = require('./controllers/PointsController');

routes.get('/', (req, res) => {
  return res.render('index.html');
});

routes.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

routes.post('/savepoint', PointsController.store);
routes.get('/search', PointsController.index);

module.exports = routes;
