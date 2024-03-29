const usuarioControllers = require('../controllers/usuarioController');
const futurosController = require('../controllers/futuroController');
const tryCatchWrapper = require('./tryCatch');

// funções auxiliares
const validarSenha = async (id, senha) => {
    if (!senha || senha.length === 0) {
        return false;
    }
    const usuario = await usuarioControllers.buscarUsuarioPorId(id);
    return usuarioControllers.validarSenha(senha, usuario.senha);
}

const userAtual = async (id) => {
    const user = await usuarioControllers.buscarUsuarioPorId(id);
    const userLogado = {
        id: user.id,
        nome: user.nome,
        email: user.email,
    }
    const futuros = await futurosController.buscarFuturosSemaId(user.id);
    if (futuros.length === 0) return userLogado;
    const futuroAleatorio = futuros[Math.floor(Math.random() * futuros.length)];
    if (!await futuroRepitido(user, futuroAleatorio)) await user.addFuturo(futuroAleatorio);
    userLogado.futurosAssociado = [{
        frase: futuroAleatorio.frase,
        numero: futuroAleatorio.numero
    }];
    return userLogado;
}


const futuroRepitido = (user, futuroAleatorio) => {
    if (!user.futuros) return false;
    return user.futuros.find(fut => fut.id === futuroAleatorio.id);
}

// funções render
const home = (req, res) => {
    res.render('home');
}

const login = (req, res) => {
    res.render('login');
}

const cadastro = (req, res) => {
    res.render('cadastro');
}

const usuarioLogado = async (req, res) => {
    const { usuario } = req.session;
    res.render('userLogado', { usuario : usuario });
}

const associarFuturo = async (req, res) => {
    const { id } = req.params;
    const user = await userAtual(id);
    req.session.usuario = user;
    res.redirect('/users/usuarios');
}

// funções de controle
const criarUsuario = async (req, res) => {
    const { body } = req;
    await tryCatchWrapper(async () => {
        await usuarioControllers.criarUsuario(body);
    },
        'Usuário criado com sucesso',
        'Erro ao criar usuário',
        req
    );
    res.redirect('/users/login');
}

const usuarioExiste = async (req, res, next) => {
    const { email } = req.body;
    const usuario = await usuarioControllers.buscarUsuarioPorEmail(email);
    if (usuario) {
        req.flash('error', 'Usuário já existe');
        return res.redirect('/users/login');
    }
    next();
}

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const user = await usuarioControllers.buscarUsuarioPorEmail(email);
    if (!user) {
        req.flash('error', 'Usuário não encontrado');
        return res.redirect('/users/login');
    }
    if (!await validarSenha(user.id, senha)) {
        req.flash('error', 'Senha inválida');
        return res.redirect('/users/login');
    }
    const usuario = {
        id: user.id,
        nome: user.nome,
        email: user.email
    }
    req.session.usuario = usuario;
    res.redirect('/users/usuarios');
}

const userLogado = async (req, res, next) => {
    const { usuario } = req.session;
    const { password } = req.body;
    if (usuario && password) {
        if (!await validarSenha(usuario.id, password)) {
            req.flash('error', 'Senha inválida');
            return res.redirect('/users/usuarios');
        }
        return next();
    }
    if (usuario) {
        const userBd = await usuarioControllers.buscarUsuarioPorId(usuario.id);
        if (!userBd || userBd.id !== usuario.id || userBd.nome !== usuario.nome || userBd.email !== usuario.email) {
            req.flash('error', 'Necessario logar novamente');
            return res.redirect('/users/logout');
        }
        return next();
    }
    req.flash('error', 'Usuário não logado');
    res.redirect('/users/login');
}

const logout = async (req, res) => {
    req.session.destroy();
    res.render('logout');
}

const atualizarUsuario = async (req, res) => {
    const id = req.session.usuario.id;
    const { novoNome, senhaAtual, novaSenha } = req.body;
    if (!await validarSenha(id, senhaAtual)) {
        req.flash('error', 'Senha inválida');
        return res.redirect('/users/usuarios');
    }
    const user = {
        nome: novoNome,
        senha: (!novaSenha || novaSenha.length === 0) ? senhaAtual : novaSenha,
    };
    await tryCatchWrapper(async () => {
        const userUpdate = await usuarioControllers.atualizarUsuario(id, user);
        req.session.usuario.nome = userUpdate.nome;
    },
        'Usuário atualizado com sucesso',
        'Erro ao atualizar usuário',
        req
    );
    res.redirect('/users/usuarios');
}

const renderizarDelete = (req, res) => {
    res.render('delete');
}

const deletarUsuario = async (req, res) => {
    const { id } = req.session.usuario;
    if (!id) {
        req.flash('error', 'Usuário não pode ser deletado');
        return res.redirect('/users/login');
    }
    await tryCatchWrapper(async () => {
        await usuarioControllers.deletarUsuario(id);
    },
    'Usuário deletado com sucesso',
    'Erro ao deletar usuário',
    req
    );
    req.session.destroy();
    res.redirect('/users');
}

module.exports = {
    home,
    login,
    cadastro,
    usuarioLogado,
    associarFuturo,
    criarUsuario,
    usuarioExiste,
    loginUsuario,
    userLogado,
    logout,
    renderizarDelete,
    atualizarUsuario,
    deletarUsuario
}
