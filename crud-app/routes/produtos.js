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

// routes/produtos.js

// GET /produtos/excluir/:id
// Rota para EXCLUIR um produto pelo ID
router.get('/excluir/:id', function (req, res, next) {
    // 1. Captura o ID da URL e converte para número
    const idParaExcluir = parseInt(req.params.id);

    // 2. Encontra a posição (índice) do objeto no array de produtos
    // Usamos findIndex para obter o índice necessário para o splice
    const indice = produtoModel.produtos.findIndex(p => p.id === idParaExcluir);

    // 3. Se encontrou a pessoa (índice diferente de -1), remove o item
    if (indice !== -1) {
        produtoModel.produtos.splice(indice, 1);
    }

    // 4. Redireciona o usuário de volta para a listagem atualizada
    res.redirect('/produtos/listagem');
});

// GET /produtos/editar/:id
// Rota para BUSCAR o produto e exibir o formulário de edição PREENCHIDO
router.get('/editar/:id', function (req, res, next) {
    // 1. Captura o ID da URL e converte para número
    const idParaEditar = parseInt(req.params.id);

    // 2. Encontra o objeto produto no array (uso do método find() do JS)
    const produtoEncontrado = produtoModel.produtos.find(p => p.id === idParaEditar);

    // 3. Verifica se o produto existe
    if (produtoEncontrado) {
        // Renderiza a View de edição, enviando o objeto do produto
        // A View será views/produtos/edicao.hbs
        res.render('produtos/edicao', { 
            title: 'Editar Produto',
            produto: produtoEncontrado 
        });
    } else {
        // Se não encontrou, redireciona para a listagem
        res.redirect('/produtos/listagem');
    }
});

// Rota para RECEBER os dados alterados e substituir o objeto no Model 
router.post('/editar/:id', function (req, res, next) {
    // 1. Capturar o ID do formulário (que veio do campo hidden)
    const idParaAlterar = parseInt(req.body.id);

    // 2. Encontra a posição (índice) do objeto antigo no array
    const indice = produtoModel.produtos.findIndex(p => p.id === idParaAlterar);

    // 3. Verifica se encontrou o produto
    if (indice !== -1) {
        // Cria o novo objeto com os dados submetidos pelo formulário (req.body)
        // MANTENDO o ID e CONVERTENDO os números
        const dadosAtualizados = {
            id: idParaAlterar, // Mantém o ID original (CRÍTICO)
            nome: req.body.nome,
            descricao: req.body.descricao,
            quantidade: parseInt(req.body.quantidade), 
            valor: parseFloat(req.body.valor),
        };

        // 4. Substitui o objeto antigo pelo novo objeto no array!
        produtoModel.produtos[indice] = dadosAtualizados;
    }
    // 5. Redireciona para a listagem para confirmar a alteração
    res.redirect('/produtos/listagem');
});

module.exports = router;