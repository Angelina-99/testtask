var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  //Получить все заяки
  app.get('/applications', (req, res) => {
    db.collection('applications').find({}).toArray((err, docs) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      else {
        res.send(docs.map(data => {
          data.createdAt = data._id.getTimestamp();
          return data
        }));
      }
    });
  });
  //Получить количество заявок
  app.get('/applications/count', (req, res) => {
    db.collection('applications').countDocuments({}, (err, item) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(new Object ({applicationsCount: item}));
      }
    });
  });
  //Получить заявку по уникальному id
  app.get('/applications/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('applications').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        item.createdAt = item._id.getTimestamp();
        res.send(item);
      } 
    });
  });
  //Добавление новой заявки
  app.post('/applications', (req, res) => {
    const note = req.body;
    db.collection('applications').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  //Изменить статус заявки
  app.post('/changestatus', (req, res) => {
    const id = req.body.orderId;
    const note = req.body.status;
    const details = { '_id': new ObjectID(id) };
    db.collection('applications').updateOne(details, { $set: { status: note } }, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
  // Функционал для удаления заявки
  // app.delete('/applications/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   db.collection('applications').remove(details, (err, item) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send('Заявка ' + id + ' удалена!');
  //     } 
  //   });
  // });
  // Функционал для изменения всей заявки
  // app.put ('/applications/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   const note = req.body;
  //   db.collection('applications').update(details, note, (err, result) => {
  //     if (err) {
  //         res.send({'error':'An error has occurred'});
  //     } else {
  //         res.send(note);
  //     } 
  //   });
  // });
};