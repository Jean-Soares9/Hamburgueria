/**
 * CRUD de Lanches com MongoDB
 */

// Importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database')

// Importação do modelo de dados de lanches
const lancheModel = require('./src/models/Lanches')

// CRUD Create - Adicionar um novo lanche
const criarLanche = async (nomeLanche, descricao, preco) => {
    try {
        const novoLanche = new lancheModel({
            nomeLanche,
            descricao,
            preco
        })
        await novoLanche.save()
        console.log("Lanche adicionado com sucesso.")
    } catch (error) {
        console.log(error)
    }
}

// CRUD Read - Listar todos os lanches
const listarLanches = async () => {
    try {
        const lanches = await lancheModel.find().sort(
            {
                nomeLanche: 1
            }
        )
       console.log(lanches)
    } catch (error) {
        console.log(error)
    }
}

const atualizarLanche = async (novoPreco) => {
    try {
        // Supondo que seja um banco de dados MongoDB, SQL ou outro.
        const resultado = await novoPrecoModel.find() .sort(
            
            {
                
                preco: novoPreco
                
            }
        )
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
}


// Execução da aplicação
const app = async () => {
    await conectar()

    // CRUD - Create
    //await criarLanche("Chicken", "Pão,frango, bacon, queijo e molho especial", 15.90)
    //await criarLanche("Quarteirão", "Pão, hambúrguer, queijo, alface, tomate e maionese", 13.50)
    //await criarLanche("X-Crispy", "Pão de brioche, hambúrguer, bacon, cebola Crispy e molho especial", 19.00)
    //await criarLanche("X-Bacon", "Pão de brioche, hambúrguer, bacon, alface, tomate e molho especial", 20.00)
    //await criarLanche("X-Calabresa", "Pão, hambúrguer, calabresa, alface, tomate e maionese", 18.00)
    //await criarLanche("X-Egg", "Pão, hambúrguer, queijo, 2 ovos e molho especial", 19.00)
    //await criarLanche("X-Salada", "Pão, hambúrguer, maionese especial, queijo, alface e tomate", 16.50)
    //await criarLanche("Melt", "Pão australiano, hambúrguer, maionese, queijo e molho cheddar", 18.00)
    //await criarLanche("Tasty", "Pão Brioche ,hambúrguer, cebola onion, tomate, alface e molho chipotle", 19.90)
    

    // CRUD - Read
    await listarLanches("Chicken, Pão, frango, bacon, queijo e molho especial", 15.90)

    // CRUD - Update (suponha que o ID seja "12345")
    await atualizarLanche( 17.50);


    await desconectar()
}

console.clear()
app()
