var ObjectID = require('mongodb').ObjectID

//lista os usuarios
exports.listarusuarios = function (req, res) {
  req.db.collection('usuarios').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

    res.send(result);
  });
};

//cria usuario
exports.criarusuario = function (req, res) {
  var usuario = req.body

  req.db.collection('usuarios').save(usuario, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    return res.send(req.body);
  });

}

//validar
exports.validarusuario = function (req, res) {
  var usuario = req.body;

  req.db.collection('usuarios').findOne({"username": usuario.username, "password": usuario.password}, function(err, result) {
    if (err) {
      return res.sendStatus(401);
    }
    console.log(result);
    res.send(result);
  });
};
