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

// // listar cada pais
exports.listarPais = function (req, res) {
  var nomePais = req.params.pais;
  var nomeJornal = req.params.jornal;

  req.db.collection('paises').findOne({nome: nomePais, nome_jornal: nomeJornal}, function(err, result) {
    if (err) {
      return console.log(err)
    };

    // res.send(result);

    // req.db.collection('paises').findOne({nome_jornal: nomeJornal}, function(err, result) {
    //   if(err){
    //     return console.log(err);
    //   }

      res.send(result)
      console.log(result);
    });
//   });
};

// listar todos os jornal
// exports.listarJornais = function (req, res) {
//
//   req.db.collection('paises').find().toArray(function(err, result) {
//     if (err) {
//       return console.log(err);
//     };
//
//     res.send(result[0].jornais);
//   });
// };
//
// // listar cada journals
// exports.listarJornal = function (req, res) {
//   var nomeJornal = req.params.jornal;
//   var nomePais = req.params.pais;
//   // for(var i = 0; i <= )
//   req.db.collection('paises').findOne({nome_jornal: nomeJornal, nome: nomePais}, function(err, result) {
//     if (err) {
//       return console.log(err);
//     };
// console.log(result);
//     res.send(result);
//   });
// };
//
// // listar noticiaS
// exports.listarNoticias = function (req, res) {
//
//   req.db.collection('noticias').find().toArray(function(err, result) {
//     if (err) {
//       return console.log(err);
//     };
//
//     res.send(result);
//   });
// };
