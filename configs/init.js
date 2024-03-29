// importando o arquivo de conexão com o banco de dados
const { db } = require('../database/dbConect.js');
// importando os models
require('../database/modelos/usuarios.js');
require('../database/modelos/futuros.js');
require('../database/modelos/relacao.js');

// sincronizando o banco de dados
const initDb = () => {
  return db.sync({ force: false })
    .then(() => console.log('Tabelas e relações criadas com sucesso'))
    .catch(error => console.log('Erro ao criar tabelas e relações: ', error));
};

module.exports = initDb;
