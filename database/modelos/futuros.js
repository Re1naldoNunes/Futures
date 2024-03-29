const { db, Seq } = require('../dbConect');

const Futuros = db.define('futuros', {
    frase : {
        type: Seq.STRING,
        allowNull: false
    },
    numero : {
        type: Seq.INTEGER,
        allowNull: false
    }
});

module.exports = Futuros;
