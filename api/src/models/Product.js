const { Schema, model }  = require('mongoose');

const ProductSchema =  Schema ({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    abv: {
        type: Number
    },
    ibu: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    volumen: {
        type: Number
    },
    others: {
        type: String
    }
})

module.exports = model('Product', ProductSchema);