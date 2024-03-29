const router = require('express').Router();

const futuroService = require('../services/futuroServices');
const usuarioService = require('../services/usuarioServices');

router.post('/associar/:id',usuarioService.userLogado , usuarioService.associarFuturo);
router.post('/criar', futuroService.criarFuturo);


module.exports = router;