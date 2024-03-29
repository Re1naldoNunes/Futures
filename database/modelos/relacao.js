const Usuarios = require('./usuarios');
const Futuros = require('./futuros');

Usuarios.belongsToMany(Futuros, { through: 'UsuarioFuturo' });
Futuros.belongsToMany(Usuarios, { through: 'UsuarioFuturo' });
