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

module.exports = router;