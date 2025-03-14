/**
 * CRUD de Lanches com MongoDB
 */
 
// Importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database');
 
// Importação do modelo de dados de lanches
const lancheModel = require('./src/models/Lanches');
const stringSimilarity = require('string-similarity'); // Importação correta
 
// CRUD Create - Adicionar um novo lanche
const criarLanche = async (nomeLanche, descricao, preco) => {
    try {
        const novoLanche = new lancheModel({
            nomeLanche,
            descricao,
            preco
        });
        await novoLanche.save();
        console.log("Lanche adicionado com sucesso.");
    } catch (error) {
        console.log(error);
    }
};
 
// CRUD Read - Listar todos os lanches
const listarLanches = async () => {
    try {
        const lanches = await lancheModel.find().sort({ nomeLanche: 1 });
        console.log(lanches);
    } catch (error) {
        console.log(error);
    }
};
 
// CRUD Update - Atualizar um lanche
const atualizarLanches = async (id, nomeLanche, descricao, preco) => {
    try {
        const lanches = await lancheModel.findByIdAndUpdate(
            id,
            { nomeLanche, descricao, preco },
            { new: true, runValidators: true }
        );
 
        if (!lanches) {
            console.log("Lanche não encontrado");
        } else {
            console.log("Lanche alterado com sucesso");
        }
    } catch (error) {
        console.log(error);
    }
};
 
// CRUD Read - Buscar um lanche específico
const buscarLanche = async (nome) => {
    try {
        const lanches = await lancheModel.find({ nomeLanche: new RegExp(nome, 'i') });
 
        if (lanches.length === 0) {
            console.log("Lanche não cadastrado no cardápio.");
            return;
        }
 
        const nomesLanches = lanches.map(lanche => lanche.nomeLanche);
        const match = stringSimilarity.findBestMatch(nome, nomesLanches);
 
        // Verifica se a melhor correspondência tem uma similaridade aceitável
        if (match.bestMatch.rating < 0.5) {
            console.log("Nenhum lanche encontrado com nome similar.");
            return;
        }
 
        const melhorLanche = lanches.find(lanche => lanche.nomeLanche === match.bestMatch.target);
 
        if (!melhorLanche) {
            console.log("Erro ao encontrar lanche correspondente.");
            return;
        }
 
        const lancheFormatado = {
            nomeLanche: melhorLanche.nomeLanche,
            descricao: melhorLanche.descricao,
            preco: `R$ ${melhorLanche.preco.toFixed(2)}`
        };
 
        console.log(lancheFormatado);
    } catch (error) {
        console.log("Erro ao buscar lanche:", error);
    }
};
 
// Execução da aplicação
const app = async () => {
    await conectar();
 
    // CRUD - Create (Descomente para adicionar lanches)
    // await criarLanche("Chicken", "Pão, frango, bacon, queijo e molho especial", 15.90);
    // await criarLanche("Quarteirão", "Pão, hambúrguer, queijo, alface, tomate e maionese", 13.50);
    // await criarLanche("X-Crispy", "Pão de brioche, hambúrguer, bacon, cebola Crispy e molho especial", 19.00);
 
    // Buscar lanche
    await buscarLanche("Tasty");
 
    // Atualizar lanche
    await atualizarLanches('67be6aa6d5abecb93089dc99', 'Tasty', 'Pão Brioche ,hambúrguer, cebola onion, tomate, alface', 21.86);
 
    // CRUD - Read
    // await listarLanches();
 
    await desconectar();
};
 
console.clear();
app();
 
 