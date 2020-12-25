var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var salt = '$2b$10$TPo5MIlHmNrX2ITZ3rVHNO';

module.exports = function(app, db) {
  //Главная страница (с формой для добавления заявки)
  app.get('/', function(req, res) {
    res.sendfile('index.html');
  });
  //Страница заявки
  app.get('/order/:id', function(req, res) {
    res.sendFile('order.html', { root: './app/client/order' });
  });
  //Административная страница: авторизация
  app.get('/admin', function(req, res) {
    res.sendFile('auth.html', { root: './app/client/admin' });
  });
  //Административная страница
  app.post('/admin/auth', function(req, res) {
    db.collection('appauth').findOne({ username: 'admin'}, (err, item) => {
      if (err) {
        res.send({'error':'Error'});
      } else {
        if (bcrypt.hashSync(req.body.password, salt) === item.admin) {
          res.sendFile('admin.html', { root: './app/client/admin' });
        }
        else {
          res.send("Неверный пароль");
        }
      } 
    });
  });
};