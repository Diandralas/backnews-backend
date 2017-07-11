var request = require('request');
var parseString = require('xml2js').parseString;
var express = require('express');
var expressMongoDb = require('express-mongo-db');

var app = express();

// importa controllers
var CanadaController = require('./controllers/canada.js');

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/compilador'));

// app.post('/canada', function (req, res) {
//   request('http://pox.globo.com/rss/g1/', function (error, response, body){
//     parseString(body, function (err, result) {
//       // var str = '<p>' + result.rss.channel[0].item[1].title + '</p>';
//       // str += '<a href="'+result.rss.channel[0].item[1].link[0]+'">Ir</a>';
//       var str = '<p>' + result.rss.channel[0].item[1].title + '</p>';
//       str += '<a href="'+result.rss.channel[0].item[1].link[0]+'">Ir</a>';
//       res.send(str);
//       req.db.collection('canada').save(req.body, function(err, result) {
//         if (err) {
//           return res.sendStatus(503);
//         }
//
//        res.sendStatus(201);
//       });
//     });
//   });
// });

//libera acesso à API de qualquer host/cliente
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// cria endpoints para funcoes de controllers
app.get('/canada', CanadaController.listar);
app.post('/canada', CanadaController.criar);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
