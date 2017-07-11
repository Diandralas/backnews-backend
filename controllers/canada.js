var ObjectID = require('mongodb').ObjectID;
var request = require('request');
var parseString = require('xml2js').parseString;


// listar
exports.listar = function (req, res) {
  req.db.collection('canada').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

   res.send(result);
  });
}

// cria um novo item
// exports.criar = function (req, res) {
//   req.db.collection('canada').save(req.body, function(err, result) {
//     if (err) {
//       return res.sendStatus(503);
//     }
//
//    res.sendStatus(201);
//   });
// };

exports.criar = function (req, res) {
  request('http://pox.globo.com/rss/g1/', function (error, response, body){


    parseString(body, function (err, result) {

      var objetos = [];
      for(var i in result.rss.channel[0].item){
        var itemAtual = result.rss.channel[0].item[i];

        var objeto = {
          titulo: itemAtual.title[0],
          desc: itemAtual.description[0],
          link: itemAtual.link[0]
        }

        objetos.push(objeto);
        // res.send(result.rss.channel[0]);

      }

      //
      // // var str = '<p>' + result.rss.channel[0].item[1].title + '</p>';
      // // str += '<a href="'+result.rss.channel[0].item[1].link[0]+'">Ir</a>';
      // var str = '<p>' + result.rss.channel[0].item[1].title + '</p>';
      // str += '<a href="'+result.rss.channel[0].item[1].link[0]+'">Ir</a>';

      req.db.collection('canada').insertMany(objetos, function(err, result) {
        if (err) {
          return res.sendStatus(503);
        }

       res.sendStatus(201);
      });
    });
  });
};
