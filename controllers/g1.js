var ObjectID = require('mongodb').ObjectID;
var request = require('request');
var parseString = require('xml2js').parseString;


// listar paises
exports.listarPaises = function (req, res) {

  req.db.collection('paises').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

    res.send(result);
  });
};

// listar cada journals
exports.listarJornais = function (req, res) {
  var nomeJornal = req.params.jornais;
  req.db.collection('paises.jornal').findOne({jornal: nomeJornal}).toArray(function(err, result) {
    if (err) {
      return console.log(err);
    };

    res.send(result);
  });
};

// listar noticiaS
exports.listarNoticias = function (req, res) {
  var nomeNoticia = req.params.noticias;
  req.db.collection('noticias').find().toArray(function(err, result) {
    if (err) {
      return console.log(err);
    };

    res.send(result);
  });
};
