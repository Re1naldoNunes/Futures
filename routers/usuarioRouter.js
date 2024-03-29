const router = require('express').Router();
const usuarioServices = require('../services/usuarioServices');

router.get('/', usuarioServices.home);
router.get('/login', usuarioServices.login);
router.get('/cadastro', usuarioServices.cadastro);
router.get('/usuarios', usuarioServices.userLogado, usuarioServices.usuarioLogado);
router.get('/logout', usuarioServices.logout);

router.post('/cadastro', usuarioServices.usuarioExiste, usuarioServices.criarUsuario);
router.post('/login', usuarioServices.loginUsuario);
router.post('/update', usuarioServices.atualizarUsuario);
router.post('/delete', usuarioServices.deletarUsuario);
router.post('/delete/confirm', usuarioServices.userLogado, usuarioServices.renderizarDelete);

module.exports = router;
