function UsuariosDAO(connection) {
//  console.log('Função Carregou');
this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("usuarios", function(err, collection) {
      collection.insert(usuario);

      mongoclient.close();
    });
  }

  );
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
  // console.log(usuario);
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("usuarios", function(err, collection) {
      collection.find(usuario).toArray(function(err, result){
        //console.log(result);

        if(result[0] != undefined){
          req.session.autorizado = true;
        }

        if(req.session.autorizado){
          res.send('Usuário encontrado nos nossos registros!');
        }else {
          res.send('Usuário não existe!');
        }

      });

      mongoclient.close();
    });
  });
}

module.exports = function() {
    return UsuariosDAO;
}
