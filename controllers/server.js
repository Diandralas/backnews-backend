var cron = require('node-cron');
var request = require('request');
require('./cron.js');
var parseString = require('xml2js').parseString;


var xml2js = require('xml2js');
var NewData = [];

parser.parseString(xml), function (err, result) {
  var objeto = {
    for(var i in result.rss.channel[0].item){
      var itemAtual = result.rss.channel[0].item[i];
      
    titulo: itemAtual.title[0],
    desc: stripHtml(itemAtual.description[0]),
    link: itemAtual.link[0],
    _id: itemAtual.link[0],

  }
    NewData = result['objeto'];


  req.db.collection('noticias').save(objeto, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }
  });
}



  //
  // // roda a cada 1 minuto
  // cron.schedule('* * * * *', function(){
  //   // imprime log ao rodar a task
  //   console.log("Rodando a busca de noticias " + new Date());
  //
  //   // faz um request para o proprio servidor, apontando para o endpoint que carrega noticias (pode fazer um desse para cada chamada que precisar)
  //   // substitua "http://localhost:3000" pelo endpoint que quer chamar
  //   request.post("http://localhost:3000/carregar", function (error, response, body) {
  //     if (error) {
  //       console.log('Erro ao carregar noticias: ', error);
  //     }
  //   });
  // });


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
  //
