const dotenv = require('dotenv').config();
const env = dotenv.parsed;

const Seq = require('sequelize');

const db = new Seq(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false
});

db.authenticate().then(() => {
    console.log('Conectado com sucesso!');
}).catch(err => {
    console.error('Falha na conexão: ', err);
});

module.exports = {
    db,
    Seq
}