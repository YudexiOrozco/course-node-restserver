const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');



const usuariosGet = async(req, res = response ) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip( Number(desde) )
      .limit( Number(limite) )
  ]);

  res.json({
    total,
    usuarios
  });
}

const usuariosPut = async(req, res = response) => {

  const { id } = req.params;
  const { password, google, email, ...resto } = req.body;

  if ( password ) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  res.json(usuario);
}

const usuariosPost = async(req, res) => {

  const { user, email, password, role } = req.body;
  const usuario = new Usuario({ user, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  // Guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
}

const usuariosDelete = async(req, res) => {

  const { id } = req.params;

  // Se borra fisicamente no se recomienda
  // const usuario = await Usuario.findByIdAndDelete( id ); 

  const usuario = await Usuario.findByIdAndUpdate( id, { state: false } );

  res.json(usuario);
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}