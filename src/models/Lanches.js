const mongoose = require('mongoose')

const lancheSchema = new mongoose.Schema({
    nomeLanche: { 
        type: String, 
        required: true, 
        unique: true 
    },
    descricao: { 
        type: String, 
        required: true 
    },
    preco: { 
        type: Number, 
        required: true, 
        min: 0 
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Lanche', lancheSchema)
