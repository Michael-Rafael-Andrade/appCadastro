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

// routes/produtos.js (Adicionar o import se estiver faltando)
var produtoModel = require('../models/ProdutoModel'); 

// ...

// POST /produtos/cadastro
// Rota para RECEBER os dados do formulário e salvar no Model
router.post('/cadastro', function(req, res, next) {
    
    // Captura os dados do formulário (req.body)
    const dadosNovoProduto = {
        // Gera o próximo ID único
        id: produtoModel.getMaxId(),
        nome: req.body.nome,
        descricao: req.body.descricao,
        
        // 🚨 CRÍTICO: Converte strings (do formulário) para números
        quantidade: parseInt(req.body.quantidade), 
        valor: parseFloat(req.body.valor),         
    };

    // Adiciona o novo objeto ao array de produtos no Model
    produtoModel.produtos.push(dadosNovoProduto);

    // Redireciona o usuário para a listagem para ver o novo registro
    res.redirect('/produtos/listagem');
});

module.exports = router;