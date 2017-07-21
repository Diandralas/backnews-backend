var MongoClient = require('mongodb').MongoClient;

var db;
var url = 'mongodb://localhost:27017/noticias';

MongoClient.connect(url, function (err, database) {
  if (err) return console.log(err);
  db = database;
});

var cron = require('node-cron');
var request = require('request');

// roda a cada 1 minuto
cron.schedule('* * * * *', function(){
  // imprime log ao rodar a task
  console.log("Rodando a busca de noticias " + new Date());

});
