const Role = require('../models/role')
const Usuario = require('../models/user');

const roleValido = async(role = '') => {
  const existeRole = await Role.findOne({ role });
  if ( !existeRole ) {
    throw new Error(`El rol ${ role } no está registrado en la BD`)
  }
}

const emailExiste = async( email = '' ) => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });
  if ( existeEmail ) {
    throw new Error(`El correo: ${ email }, ya está registrado`);
  }
}

const existeUsuarioPorId = async( id ) => {

  const existeUsuario = await Usuario.findById( id );
  if ( !existeUsuario ) {
    throw new Error(`El id no existe: ${ id }`);
  }
}

module.exports = {
  roleValido,
  emailExiste,
  existeUsuarioPorId
}
