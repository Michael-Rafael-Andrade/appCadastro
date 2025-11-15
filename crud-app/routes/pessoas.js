// pessoas.js - ROTAS
// importação - Express e criar um objeto router
var express = require('express');
var router = express.Router();

// importa modelo (os dados em mémoria no objeto)
var pessoaModel = require('../models/PessoaModel');

// GET /pessoas/Listagem
router.get('/listagem', function(req, res, next) {
    // O controller pega os dados brutos do Model
    const listaDePessoas = pessoaModel.pessoas;

    // O Controller decide qual view renderizar, enviando os dados necessários 
    // O Express/HBS procurará por views/pessoas/listagem.hbs
    res.render('pessoas/listagem', {
        title: 'Listagem de Pessoas',
        pessoas: listaDePessoas,
    });
});

// Exporta o router para ser usado pelo app.js
module.exports = router;




 
// module.exports = {pessoas}; Dentro do controller não exporta dados desta forma mas exporta rotas!