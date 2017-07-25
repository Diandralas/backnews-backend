var ObjectID = require('mongodb').ObjectID;
var request = require('request');
var parseString = require('xml2js').parseString;

// const url = 'http://pox.globo.com/rss/g1/'; 'http://www.estadao.com.br/rss/ultimas.xml';

// var vetorPaises = [];

exports.criarG1 = function (req, res) {
  req.db.collection("paises").find().toArray(function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }
  });

  // var vetorPaises = paises
  console.log(vetorPaises);

  for(var j in vetorPaises){

    for(var k in vetorPaises[j].jornais){
      console.log(vetorPaises[j].jornais[k].nome_jornal);
      console.log(vetorPaises[j].jornais[k].rssUrl);
      request(vetorPaises[j].jornais[k].nome_jornal.rssURL, function (error, response, body){

        parseString(body, function (err, result) {


          for(var i in result.rss.channel[0].item){
            console.log(result.rss.channel[0].item);
            var itemAtual = result.rss.channel[0].item[i];
            console.log(itemAtual)
            var objeto = {
              titulo: itemAtual.title[0],
              desc: stripHtml(itemAtual.description[0]),
              link: itemAtual.link[0],
              _id: itemAtual.link[0],
              jornal: vetorPaises[j].jornais[k].nome_jornal,
              pais: vetorPaises[j].nome,
              dataCriacao: new Date()
            }
          }

          req.db.collection('noticias').save(objeto, function(err, result) {
            if (err) {
              return res.sendStatus(503);
            }
          })
        })
      });
    }
  }
  res.sendStatus(201);
}

function stripHtml(text) {
  return text.replace(/<.*?>/g, '');
}
