const Product = require('../models/product');

const getProductsByUser = async (req, res) => {
    const { userId } = req.query;

    let products = [], response = {};

    try {
        products = await Product.find({userId: userId});

        if (products.length < 1) {
            throw new Error('Nenhum Produto encontrado');
        }

        response = {status: 200, products: products};

    } catch (err) {
        response = {status: 500, message: err.message}
    }

    res.json(response);
};

exports.getProductsByUser = getProductsByUser;