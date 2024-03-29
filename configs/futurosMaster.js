const Futuros = require('../database/modelos/futuros');
const usuarioController = require('../controllers/usuarioController');


const dados = [
    { frase: 'O futuro pertence àqueles que acreditam na beleza de seus sonhos.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro começa hoje, não amanhã.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro depende do que fazemos no presente.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro é criado por aquilo que você faz hoje, não amanhã.', numero: Math.floor(Math.random() * 100) },
    { frase: 'O futuro tem muitos nomes. Para os fracos, é o inatingível. Para os temerosos, o desconhecido. Para os valentes é a oportunidade.', numero: Math.floor(Math.random() * 100) }
];

const userAdmin = {
    nome: 'admin',
    email: 'admin@admin',
    senha: 'admin'
};

async function adicionarDados() {
    try {
        let adm = await usuarioController.buscarUsuarioPorEmail(userAdmin.email);
        if (!adm) {
            const admin = await usuarioController.criarUsuario(userAdmin);
            console.log('Usuário admin criado com sucesso!');
            adm = admin;
        }
        const futurosAdm = await adm.getFuturos();
        const frasesAdm = futurosAdm.map(futuro => futuro.frase);
        const novosDados = dados.filter(dado => !frasesAdm.includes(dado.frase));
        if (novosDados.length > 0) {
            const futuros = await Futuros.bulkCreate(novosDados);
            await adm.addFuturos(futuros);
            console.log('Novos dados adicionados com sucesso!');
        } else {
            console.log('Não há novos dados para adicionar.');
        }
    } catch (error) {
        console.error('Erro ao adicionar dados:', error);
    }
}

module.exports = adicionarDados; 
