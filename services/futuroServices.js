const futurosController = require('../controllers/futuroController');
const usuarioControllers = require('../controllers/usuarioController');
const tryCatchWrapper = require('./tryCatch');

const criarFuturo = async (req, res) => {
    const future = {
        frase: req.body.frase,
        numero: Math.floor(Math.random() * 1000000)
    }
    await tryCatchWrapper(async () => {
        const novoFuturo = await futurosController.criarFuturo(future);
        const user = await usuarioControllers.buscarUsuarioPorId(req.session.usuario.id);
        await user.addFuturo(novoFuturo);
    },
        'Futuro criado e associado com sucesso',
        'Erro ao criar e associar futuro',
        req
    );
    res.redirect('/users/usuarios');
}

const listarFuturos = async (req, res) => {
    await tryCatchWrapper(async () => {
        const futuros = await futurosController.listarFuturos();
        return res.render('futuros', { futuros });
    },
        'Futuros listados com sucesso',
        'Erro ao listar futuros',
        req
    );
    res.redirect('/futuros');
}

const buscarFuturoPorId = async (req, res) => {
    const { id } = req.params;
    await tryCatchWrapper(async () => {
        const futuro = await futurosController.buscarFuturoPorId(id);
        return res.render('futuro', { futuro });
    },
        'Futuro encontrado com sucesso',
        'Erro ao encontrar futuro',
        req
    );
    res.redirect('/futuros');
}

const atualizarFuturo = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    await tryCatchWrapper(async () => {
        await futurosController.atualizarFuturo(id, body);
    },
        'Futuro atualizado com sucesso',
        'Erro ao atualizar futuro',
        req
    );
    res.redirect('/futuros');
}

const deletarFuturo = async (req, res) => {
    const { id } = req.params;
    await tryCatchWrapper(async () => {
        await futurosController.deletarFuturo(id);
    },
        'Futuro deletado com sucesso',
        'Erro ao deletar futuro',
        req
    );
    res.redirect('/futuros');
}

module.exports = {
    criarFuturo,
    listarFuturos,
    buscarFuturoPorId,
    atualizarFuturo,
    deletarFuturo
}
