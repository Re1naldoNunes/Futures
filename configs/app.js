const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

// Importar rotas
const usuariosRoutes = require('../routers/usuarioRouter');
const futureRoutes = require('../routers/futureRouter');

// Criar aplicativo
const app = express();

// Configurar aplicativo
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '../views/includes/')
}));
app.set('view engine', 'handlebars');

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Configuração do flash
app.use(flash());

// Middleware para disponibilizar as mensagens flash para todas as rotas
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.set('Cache-Control', 'no-store')
    next();
});

// Configurar middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rotas
app.use('/users', usuariosRoutes);
app.use('/future', futureRoutes);
app.use(express.static('public'));

module.exports = app;
