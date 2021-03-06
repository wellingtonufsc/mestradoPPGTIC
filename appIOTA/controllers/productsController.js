const Product = require('../models/product');
const Request = require('../models/request');
const State = require('../models/state');
const Configuration = require('../models/configuration');
const Mam = require('@iota/mam');
const { asciiToTrytes } = require('@iota/converter');

const getAll = async (req, res) => {
    let products = [], response = {};

    try {

        products = await Product.find({user_id:{$ne:true}});

        if (products.length < 1) {
            throw new Error('Não existem produtos cadastrados na plataforma!');
        }

        response = {products: products};
        res.status(200);

    } catch (err) {
        response = {message: err.message};
        res.status(404);
    }

    res.json(response);
}

const getProductsByUser = async (req, res) => {
    const { userId } = req.params;

    let products = [], response = {};

    try {
        if(!userId) {
            throw new Error('Usuário Indefinido');
        }

        products = await Product.find({user_id: userId});

        if (products.length < 1) {
            throw new Error('Nenhum Produto encontrado');
        }

        response = {products: products};
        res.status(200);

    } catch (err) {
        response = {message: err.message};
        res.status(404);
    }

    res.json(response);
};

const addProductData = async (req, res) => {
    let device = req.body[0].deviceUUID;
    let body = req.body[0];
    let response = {}, info = {};

    let createdRequest = new Request({
        request: body,
        hora_que_chegou: new Date()
    });

    createdRequest.save();

    delete body['deviceUUID'];

    try {
        if(!device) {
            throw new Error('Device field empty!');
        }

        if (body.signals[0].UUID == "batteryTX") {
            throw new Error('Não queremos salvar bateria');
        }

        existingProduct = await Product.findOne({device_id: device});

        if (!existingProduct) {
            let createdProduct = new Product({
                device_id: device
            });

            createdProduct = await createdProduct.save();

            info = await attachToTangle(body);

            await Product.updateOne({_id: createdProduct._id}, {
                mamState: info.state,
                first_root: info.root,
                user_id: 0
            });
        } else {
    
            info = await attachToTangle(body, existingProduct.mamState);

            await Product.updateOne({_id: existingProduct._id}, {
                mamState: info.state
            });
        }

        response = {message: info};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    return res.send();
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

    let transactions = await Mam.attach(message.payload, message.address, 3, 14);

    let createdState = new State({
        state: mamState,
        hora_que_chegou: new Date()
    });

    await createdState.save();

    let info = {};
    info.state = mamState;
    info.root = message.root;

    if (transactions.length == 0) {
        throw new Error('erro ao salvar a transação no Tangle');
    }

    return info;
};

const loadConfig = async (req, res) => {
    try {
        let config = await loadConfiguration();

        if (!config) {
            throw new Error('Não foi possível carregar as configurações')
        }

        response = {config: config};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    res.json(response);
}

const selectProduct = async (req, res) => {
    const { userId, deviceID, productName, destination } = req.body;
    let response = {};

    try {
        if (!userId) {
            throw new Error('Usuário vazio!');
        }

        if (!deviceID) {
            throw new Error('ID do dispositivo não escolhido!');
        }

        if (!productName) {
            throw new Error('nome do produto não escolhido!');
        }

        if (!destination) {
            throw new Error('informa o trajeto!');
        }

        existingProduct = await Product.findOne({device_id: deviceID});

        if (!existingProduct) {
            throw new Error('Nenhum produto cadastrado com esse ID!');
        }

        await Product.updateOne({_id: existingProduct._id}, {
            user_id: userId,
            name: productName,
            destination: destination
        });

        response = {message: 'Cadastrado com sucesso!'};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    res.json(response);
}

const view = async (req, res) => {
    const { productId } = req.params;
    let product = [], response = {};

    try {
        if (!productId) {
            throw new Error('ID do produto inválido');
        }

        product = await Product.findOne({_id: productId}, {user_id: 1, first_root: 1, name: 1, destination: 1, mamState: 1});

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        response = {product: product};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    res.json(response);
}

exports.getAll = getAll;
exports.getProductsByUser = getProductsByUser;
exports.addProductData = addProductData;
exports.selectProduct = selectProduct;
exports.loadConfig = loadConfig;
exports.view = view;