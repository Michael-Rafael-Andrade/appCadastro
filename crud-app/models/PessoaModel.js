// Criar o array que representará o banco de dados para pessoa
// models/PessoaModel.js

let pessoas = [
    // Exemplo de uma pessoa
    {
        id: 1,
        nome: "Ana Silva",
        telefone: "98765-4321",
        dataNascimento: "1990-05-15",
        sexo: "Feminino",
        endereco: "Rua A, 100",
    },
    {
        id: 2,
        nome: "Maria Soares",
        telefone: "98955-3329",
        dataNascimento: "1986-08-22",
        sexo: "Feminino",
        endereco: "Rua Projetada, 155",
    },
    {
        id: 3,
        nome: "Miguel Antunes",
        telefone: "99651-4198",
        dataNascimento: "1989-09-07",
        sexo: "Masculino",
        endereco: "Rua das flores, 351",
    },
    {
        id: 2,
        nome: "Bruno Costa",
        telefone: "98869-6789",
        dataNascimento: "1985-11-20",
        sexo: "Masculino",
        endereco: "Av. B, 50",
    },

]

// Função para gerar o próximo ID
function getMaxId(){
    if(pessoas.length === 0){
        return 1;
    }
    // Retorna o ID máximo atual + 1
    const maxId = pessoas.reduce((max, pessoa) => (pessoa.id > max ? pessoa.id : max));
    return maxId + 1;
}

// Exportamos o array de dados e a função getMaxId em um único objeto
module.exports = { pessoas, getMaxId };