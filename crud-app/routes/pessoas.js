// pessoas.js - ROTAS
// importação - Express e criar um objeto router
var express = require('express');
var router = express.Router();

// importa modelo (os dados em mémoria no objeto)
var pessoaModel = require('../models/PessoaModel');


// GET /pessoas/Listagem
router.get('/listagem', function (req, res, next) {
    // O controller pega os dados brutos do Model
    const termoBusca = req.query.q;
    let listaDePessoas = pessoaModel.pessoas;

    // O Controller decide qual view renderizar, enviando os dados necessários 
    // O Express/HBS procurará por views/pessoas/listagem.hbs
    res.render('pessoas/listagem', {
        title: 'Listagem de Pessoas',
        pessoas: listaDePessoas,
    });
});

// GET /pessoas/cadastro
// Rota para EXIBIR o formulário de cadastro
router.get('/cadastro', function (req, res, next) {
    // Apenas renderiza o formulário vazio, sem precisar do Model ainda.
    res.render('pessoas/cadastro', {
        title: 'Cadastro de Nova Pessoa'
    });
});

// POST /pessoas/cadastro
// Rota para RECEBER os dados do formulário e salvar no Model
router.post('/cadastro', function (req, res, next) {
    // Acessa os dados do formulário através do req.body
    const dadosNovaPessoa = {
        // Usamos o Model para garantir um ID único e sequencial
        id: pessoaModel.getMaxId(),
        nome: req.body.nome,
        telefone: req.body.telefone,
        dataNascimento: req.body.dataNascimento,
        sexo: req.body.sexo,
        endereco: req.body.endereco,
    };

    // Adiciona o novo objeto ao array de pessoas (nosso Model em memória)
    pessoaModel.pessoas.push(dadosNovaPessoa);

    // Redireciona o usuário para a página de listagem para ver o novo registro
    res.redirect('/pessoas/listagem');

});

// GET /pessoas/excluir/:id
// Rota para EXCLUIR uma pessoa pelo ID
router.get('/excluir/:id', function (req, res, next) {
    // Captura o ID da URL e converte para número
    // req.params.id é o valor que o EXPRESS extrai do :id na rota
    const idParaExcluir = parseInt(req.params.id);

    // Encontra a posição (índice) do objeto no array
    const indice = pessoaModel.pessoas.findIndex(p => p.id === idParaExcluir);

    // Verifica se encontrou a pessoa
    if (indice !== -1) {
        // Se encontrou, remove o item do array
        // O Node.js / JavaScript usará a função splice para essa manipulação
        pessoaModel.pessoas.splice(indice, 1);
    }

    // Redireciona o usuário de volta para a listagem atualizada
    res.redirect('/pessoas/listagem');
});

// GET /pessoas/editar/:id
// Rota para BUSCAR a pessoa e exibir o formulário de edição PREENCHIDO
router.get('/editar/:id', function (req, res, next) {
    // Captura o ID da URL e converte para número
    const idParaEditar = parseInt(req.params.id);

    // Encontra o objeto pessoa no array
    const pessoaEncontrada = pessoaModel.pessoas.find(p => p.id === idParaEditar);

    // Verifica se encontrou a pessoa
    if (pessoaEncontrada) {
        // Renderiza a View de edição, enviando o objeto da pessoa
        res.render('pessoas/edicao', { pessoa: pessoaEncontrada });
    } else {
        // Se não encontrou, redireciona para a listagem
        res.redirect('/pessoas/listagem');
    }
});

// Rota para RECEBER os dados alterados e substituir o objeto no Model 
router.post('/editar/:id', function (req, res, next) {
    // Capturar o ID do formulário (que veio do campo hidden)
    const idParaAlterar = parseInt(req.body.id);

    // Encontra a posição (índice) do objeto antigo no array
    const indice = pessoaModel.pessoas.findIndex(p => p.id === idParaAlterar);

    // Verifica se encontrou a pessoa
    if (indice !== -1) {
        // Cria o novo objeto com os dados submetidos pelo formulário (req.body)
        // Mantemos o ID original e atualizamos o resto
        const dadosAtualizados = {
            id: idParaAlterar, // Mantém o ID original
            nome: req.body.nome,
            telefone: req.body.telefone,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo,
            endereco: req.body.endereco,
        };

        // Substitui o objeto antigo pelo novo objeto no array!
        pessoaModel.pessoas[indice] = dadosAtualizados;
    }
    // Redireciona para a listagem para confirmar a alteração
    res.redirect('/pessoas/listagem');
});

// Exporta o router para ser usado pelo app.js
module.exports = router;





// module.exports = {pessoas}; Dentro do controller não exporta dados desta forma mas exporta rotas!