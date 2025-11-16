// models/ProdutoModels.js
let produtos = [
    // Estrutura de produtos (ID, Nome, Descrição, Quantidade, Valor)
    {
        id: 101,
        descricao: "Laptop de alta performance para jogos.",
        quantidade: 5,
        valor: 5500.50, // Importante: armazenar como número (float)
    },
    {
        id: 102,
        nome: "Mouse sem Fio",
        descricao: "Mouse ergonômico com tecnologia Bluetooth.",
        quantidade: 20,
        valor: 89.90,        
    },
];

// Fução para gerar o próximo ID
function getMaxId() {
    if(produtos.length === 0) return 1;
    // Encontra o maior ID atual e adiciona 1
    const maxId = produtos.reduce((max, produto) => (produto.id > max ? produto.id : max), 0);
    return maxId + 1;
}

// Exportamos o array de dados e a função getMaxId em um único objeto
module.exports = {
    produtos, 
    getMaxId,
};