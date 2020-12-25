const ordersRoutes = require('./orders_routes');

const pagesRoutes = require('./pages_routes');

module.exports = function(app, db) {
  ordersRoutes(app, db);
  pagesRoutes(app, db);
};