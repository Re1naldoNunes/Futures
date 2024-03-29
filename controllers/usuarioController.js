const Usuarios = require('../database/modelos/usuarios');
const Futuros = require('../database/modelos/futuros');
const bcrypt = require('bcryptjs');

const criarUsuario = async (user) => {
    const senhaCriptografada = bcrypt.hashSync(user.senha, 8);
    user.senha = senhaCriptografada;
    return await Usuarios.create(user);
}

const buscarUsuarioPorEmail = async (email) => {
    return await Usuarios.findOne({ where: { email } });
}

const listarUsuarios = async () => {
    return await Usuarios.findAll();
}

const buscarUsuarioPorId = async (id) => {
    return await Usuarios.findByPk(id, {
        include: Futuros
    });
}

const atualizarUsuario = async (id, user) => {
    const senhaCriptografada = bcrypt.hashSync(user.senha, 8);
    user.senha = senhaCriptografada;
    await Usuarios.update(user, { where: { id } });
    return await Usuarios.findByPk(id);
}

const deletarUsuario = async (id) => {
    return await Usuarios.destroy({ where: { id } });
}

const validarSenha = (senha, senhaHash) => {
    return bcrypt.compareSync(senha, senhaHash);
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    atualizarUsuario,
    validarSenha,
    deletarUsuario
}
