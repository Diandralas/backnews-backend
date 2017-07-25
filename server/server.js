var MongoClient = require('mongodb').MongoClient;

var cron = require('node-cron');
var request = require('request');
var parseString = require('xml2js').parseString;

var db;
var url = 'mongodb://localhost:27017/compilador';

MongoClient.connect(url, function(err, database) {
  if (err) return console.log(err);
  db = database;
});

// roda a cada 1 minuto
cron.schedule('* * * * *', function() {
  console.log("Rodando serviço de busca de RSS");
  db.collection("paises").find().toArray(function(err, result) {
    if (err) {
      console.log("Erro ao buscar paises");
    } else {
      var vetorPaises = result;

      for (var j in vetorPaises) {
        for (var k in vetorPaises[j].jornais) {
          request(vetorPaises[j].jornais[k].rssUrl, function(error, response, body) {
            console.log("Encontrado pais: " + vetorPaises[j].nome);
            console.log("Buscando jornal: " + vetorPaises[j].jornais[k].nome_jornal);
            console.log("RSS encontrado");
            parseString(body, function(err, result) {
              for (var i in result.rss.channel[0].item) {
                var itemAtual = result.rss.channel[0].item[i];
                var objeto = {
                  titulo: itemAtual.title,
                  desc: stripHtml(itemAtual.description),
                  link: getUrl(itemAtual.link),
                  _id: getUrl(itemAtual.link),
                  jornal: vetorPaises[j].jornais[k].nome_jornal,
                  pais: vetorPaises[j].nome,
                  dataCriacao: new Date()
                }
              }

              db.collection("noticias").save(objeto, function(err, result) {
                if (err) {
                  console.log("Erro ao salvar: " + err);
                } else {
                  console.log("Salvo com sucesso");
                }
              })
            })
          });
        }
      }

    }
  });

});

function stripHtml(text) {
  if (!text) {
    return "";
  }
  if (text instanceof Array) {
    return text[0].replace(/<.*?>/g, '');
  }
  console.log(text);
  return text.replace(/<.*?>/g, '');
}

function getUrl(url) {
  if (url instanceof Array) {
    return url[0];
  }
  return url;
}
