var cron = require('node-cron');
var request = require('request');
require('./cron.js');

// roda a cada 1 minuto
cron.schedule('* * * * *', function(){
  // imprime log ao rodar a task
  console.log("Rodando a busca de noticias " + new Date());

  // faz um request para o proprio servidor, apontando para o endpoint que carrega noticias (pode fazer um desse para cada chamada que precisar)
  // substitua "http://localhost:3000" pelo endpoint que quer chamar
  request.post("http://localhost:3000/carregar", function (error, response, body) {
    if (error) {
      console.log('Erro ao carregar noticias: ', error);
    }
  });
});
