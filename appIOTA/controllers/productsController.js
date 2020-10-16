const Product = require('../models/product');
const Configuration = require('../models/configuration');
const Mam = require('@iota/mam');
const { asciiToTrytes } = require('@iota/converter');

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
        response = {status: 500, message: err.message};
    }

    res.json(response);
};

const addProductData = async (req, res) => {
    const { device } = req.body;
    let response = {}, info = {};

    try {
        if(!device) {
            throw new Error('Device field empty!');
        }

        existingProduct = await Product.findOne({device_id: device});

        if (!existingProduct) {
            let createdProduct = new Product({
                device_id: device
            });

            createdProduct = await createdProduct.save();

            info = await attachToTangle(req.body);

            await Product.updateOne({_id: createdProduct._id}, {
                mamState: info.state,
                first_root: info.root
            });
        } else {
            info = await attachToTangle(req.body, existingProduct.mamState);

            await Product.updateOne({_id: existingProduct._id}, {
                mamState: info.state
            });
        }

        response = {status: 200, message: info};
    } catch (err) {
        response = {status: 500, message: err.message};
    }

    res.json(response);
};

async function loadConfiguration() {
    return await Configuration.findOne();
};

async function attachToTangle(jsonData, mam_state = null) {
    let config = await loadConfiguration();
    let mamState;
    
    if(!mam_state) {
        mamState = Mam.init(config.mam_provider);
        mamState = Mam.changeMode(mamState, config.mam_mode);
    } else {
        mamState = mam_state;
    }

    const trytes = asciiToTrytes(JSON.stringify(jsonData));
    const message = Mam.create(mamState, trytes);

    mamState = message.state;

    await Mam.attach(message.payload, message.address, 3, 10);

    let info = {};
    info.state = mamState;
    info.root = message.root;

    return info;
};

exports.getProductsByUser = getProductsByUser;
exports.addProductData = addProductData;