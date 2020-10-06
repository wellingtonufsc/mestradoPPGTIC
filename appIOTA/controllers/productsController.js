const Product = require('../models/product');

const index = async (req, res) => {
    res.send('API do produto');
};

exports.index = index;