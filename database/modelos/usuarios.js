const { db, Seq } = require('../dbConect');

const Usuarios = db.define('usuarios', {
    nome: {
        type: Seq.STRING,
        allowNull: false
    },
    email: {
        type: Seq.STRING,
        allowNull: false
    },
    senha: {
        type: Seq.STRING,
        allowNull: false
    }
});

module.exports = Usuarios;
