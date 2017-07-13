var ObjectID = require('mongodb').ObjectID;
var request = require('request');
var parseString = require('xml2js').parseString;


// listar
exports.listar = function (req, res) {
  req.db.collection('california').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

   res.send(result);
  });
}

exports.criar = function (req, res) {
  request('http://www.dailynews.com/section?template=RSS&profile=4000036&mime=xml', function (error, response, body){


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

      req.db.collection('california').insertMany(objetos, function(err, result) {
        if (err) {
          return res.sendStatus(503);
        }

       res.sendStatus(201);
      });
    });
  });
};