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

// listar journals
exports.listarJornais = function (req, res) {
  var nomeJornal = req.params.jornais;
  req.db.collection('jornal').find().toArray(function(err, result) {
    if (err) {
      return console.log(err);
    };

    res.send(result);
  });
};

// listar cada journals
exports.listarJornal = function (req, res) {
  var nomeJornal = req.params.jornais;
  req.db.collection('jornal').findOne({jornal: nomeJornal}).toArray(function(err, result) {
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





//
// exports.criarNoticias = function (req, res) {
//   request('http://pox.globo.com/rss/g1/politica/mensalao/',
//   function (error, response, body){
//     parseString(body, function (err, result) {
//
//       for(var i in result.rss.channel[0].item){
//         var itemAtual = result.rss.channel[0].item[i];
//
//         var objeto = {
//           titulo: itemAtual.title[0],
//           desc: stripHtml(itemAtual.description[0]),
//           link: itemAtual.link[0],
//           _id: itemAtual.link[0],
//           dataCriacao: new Date()
//         }
//
//         req.db.collection('noticias').save(objeto, function(err, result) {
//           if (err) {
//             return res.sendStatus(503);
//           }
//         });
//         // res.send(result.rss.channel[0]);
//
//       }
//       res.sendStatus(201);
//     });
//   });
// };
//
// function stripHtml(text) {
//   return text.replace(/<.*?>/g, '');
// }
