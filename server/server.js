var MongoClient = require('mongodb').MongoClient;
var cron = require('node-cron');
var request = require('request');
var parseString = require('xml2js').parseString;
var FeedParser = require('feedparser');
var db;
var url = 'mongodb://localhost:27017/compilador';

MongoClient.connect(url, function(err, database) {
  if (err) return console.log("Error Mongo: " + err);
  db = database;
});

// roda a cada 5 minuto
var task = cron.schedule('*/5 * * * *', function() {
  console.log("Rodando serviço de busca de RSS");
  db.collection("paises").find().toArray(function(err, result) {
    if (err) {
      console.log("Erro ao buscar paises");
    } else {
      console.log("Não deu erro no find Paises");
      var vetorPaises = result;
      for (var pais in vetorPaises) {
        var nomePais = vetorPaises[pais].nome;
        for (var jornal in vetorPaises[pais].jornais) {

          var news = vetorPaises[pais].jornais[jornal].nome_jornal;
          var rss = vetorPaises[pais].jornais[jornal].rssUrl;
          updateRss(nomePais, news, rss);
          }
        }
      }
    }, false);
  });
task.start();

function updateRss(pais, jornal, rssUrl) {
  request(rssUrl, function(error, response, body) {
      parseString(body, function(err, result) {
      if(err){
        console.log("Error:" + err);
      }

      // if (!result || !result.rss) {
      //   console.log("Formato nao suportado no jornal:" + jornal);
      //   return;
      // }

      for (var i in result.rss.channel[0].item) {
        var itemAtual = result.rss.channel[0].item[i];

        console.log(itemAtual);
        var objeto = {
          titulo: itemAtual.title[0],
          desc: stripHtml(itemAtual.description),
          link: getUrl(itemAtual.link),
          jornal: jornal,
          pais: pais,
          dataCriacao: new Date()
        };

        db.collection("noticias").save(objeto, function(err, result) {
          if (err) {
            console.log("Erro ao salvar: " + err);
          } else {
                    }
        })
      }

    })
  });

// var req = request('http://www.thestar.com/feeds.articles.business.rss')
// var feedparser = new FeedParser([options]);
//
// req.on('error', function (error) {
//   // handle any request errors
// });
//
// req.on('response', function (res) {
//   var stream = this; // `this` is `req`, which is a stream
//
//   if (res.statusCode !== 200) {
//     this.emit('error', new Error('Bad status code'));
//   }
//   else {
//     stream.pipe(feedparser);
//   }
// });
//
// feedparser.on('error', function (error) {
//   // always handle errors
// });
//
// feedparser.on('readable', function () {
//   // This is where the action is!
//   var stream = this; // `this` is `feedparser`, which is a stream
//   var meta = this.meta; // the "meta" is always available in the context of the feedparser instance
//   var item;
//
//   while (item = stream.read()) {
//     console.log( item = item.title || item.description || item.link || item.jornal);
//
//   }
// });


  }

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
