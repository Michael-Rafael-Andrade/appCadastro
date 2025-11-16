// routes/produtos.js

var express = require('express');
var router = express.Router();

// Importa o Model de Produtos
var produtoModel = require('../models/ProdutoModel'); 

// GET /produtos/listagem
router.get('/listagem', function(req, res, next) {
  
  const listaDeProdutos = produtoModel.produtos; 
  
  // Renderiza a view views/produtos/listagem.hbs
  res.render('produtos/listagem', { 
    title: 'Listagem de Produtos', 
    produtos: listaDeProdutos 
  });
});

// GET /produtos/cadastro
// Rota para EXIBIR o formulário de cadastro de produtos
router.get('/cadastro', function(req, res, next) {
    // Renderiza a view views/produtos/cadastro.hbs
    res.render('produtos/cadastro', {
        title: 'Cadastro de Novo Produto'
    });
});

module.exports = router;