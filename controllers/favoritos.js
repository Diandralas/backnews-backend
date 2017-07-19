var ObjectID = require('mongodb').ObjectID;
var request = require('request');
var parseString = require('xml2js').parseString;


// atualiza um tema
exports.atualizar = function (req, res) {
  var id = req.params.id;

  req.db.collection('keywords').update({_id: ObjectID(id)}, { $set: req.body }, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

// removeutilizando o id
exports.apagar = function (req, res) {
  var id = req.params.id;

  req.db.collection('keywords').remove({_id: ObjectID(id)}, {justOne: true}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.sendStatus(200);
  });
};
