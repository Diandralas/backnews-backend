var request = require('request');
var parseString = require('xml2js').parseString;
var express = require('express');
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');

var app = express();

// inicializa o body parser
app.use(bodyParser.json());

var MasterController = require('./controllers/Geral.js');

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/compilador'));

//libera acesso à API de qualquer host/cliente
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./server/server.js');
var UsuarioController = require('./controllers/usuarios.js');

// endpoints para funcoes de controllers

app.get('/paises', MasterController.listarPaises);
app.get('/paises/:pais', MasterController.listarPais);
app.get('/paises/:pais/jornais', MasterController.listarJornais);
app.get('/paises/:pais/jornais/:jornal/noticias', MasterController.listarNoticias);

app.get('/usuario', UsuarioController.listarusuarios);
app.post('/usuario', UsuarioController.criarusuario);
app.post('/login', UsuarioController.validarusuario);

// app.get('/brasil/g1', G1Controller.listar);
// app.post('/brasil/g1', G1Controller.criar);
// app.get('/brasil/folha', FolhaController.listar);
// app.post('/brasil/folha', FolhaController.criar);
// app.get('/brasil/estadao', EstadaoController.listar);
// app.post('/brasil/estadao', EstadaoController.criar);
// app.get('/eua/nyt', TnytController.listar);
// app.post('/eua/nyt', TnytController.criar);
// app.get('/eua/california', CaliforniaController.listar);
// app.post('/eua/california', CaliforniaController.criar);
// app.get('/eua/washpost', WashController.listar);
// app.post('/eua/washpost', WashController.criar);
// app.get('/espanha/elpais', ElpaisController.listar);
// app.post('/espanha/elpais', ElpaisController.criar);
// app.get('/espanha/elmundo', ElmundoController.listar);
// app.post('/espanha/elmundo', ElmundoController.criar);
// app.get('/espanha/lavanguardia', LavanController.listar);
// app.post('/espanha/lavanguardia', LavanController.criar);

// app.get('/favoritos', FavoritoController.criar);
// app.post('/favoritos', FavoritoController.incluir);
// app.update('/favoritos', FavoritoController.atualizar);
// app.delete('/favoritos', FavoritoController.apagar);

app.listen(3000, "0.0.0.0", function () {
  console.log('Example app listening on port 3000!');
})
