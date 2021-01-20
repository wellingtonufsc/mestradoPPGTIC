const Product = require('../models/product');
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
    server.timeout(0);
    let device = req.body[0].deviceUUID;
    let response = {}, info = {};

    try {
        if(!device) {
            throw new Error('Device field empty!');
        }

        existingProduct = await Product.findOne({device_id: device});

        if (!existingProduct) {
            let primeiro = true;
            let createdProduct = new Product({
                device_id: device
            });

            createdProduct = await createdProduct.save();

            for (signalsIndex in req.body[0].signals) {

                if (req.body[0].signals[signalsIndex].UUID === 'temperature')
                {
                    for (logIndex in req.body[0].signals[signalsIndex].logs)
                    {
                        json = {
                            UUID: req.body[0].signals[signalsIndex].UUID,
                            temp: req.body[0].signals[signalsIndex].logs[logIndex].value,
                            timestamp: Date.parse(req.body[0].signals[signalsIndex].logs[logIndex].date)
                        };

                        if (primeiro) {
                            info = await attachToTangle(json);

                            primeiro = false;

                            await Product.updateOne({_id: createdProduct._id}, {
                                mamState: info.state,
                                first_root: info.root,
                                user_id: 0
                            });
                        } else {
                            info = await attachToTangle(json, info.state);

                            await Product.updateOne({_id: createdProduct._id}, {
                                mamState: info.state
                            });
                        }
                    }

                } else if (req.body[0].signals[signalsIndex].UUID === 'positionDOTS')
                {
                    for (logIndex in req.body[0].signals[signalsIndex].logs)
                    {
                        json = {
                            UUID: req.body[0].signals[signalsIndex].UUID,
                            lat: req.body[0].signals[signalsIndex].logs[logIndex].value.lat,
                            lon: req.body[0].signals[signalsIndex].logs[logIndex].value.lng,
                            timestamp: Date.parse(req.body[0].signals[signalsIndex].logs[logIndex].date)
                        };

                        if (primeiro) {
                            info = await attachToTangle(json, info.state);

                            primeiro = false;

                            await Product.updateOne({_id: createdProduct._id}, {
                                mamState: info.state
                            });
                        } else {
                            info = await attachToTangle(json, info.state);

                            await Product.updateOne({_id: createdProduct._id}, {
                                mamState: info.state
                            });
                        }
                    }
                }
            }
        } else {

            for (signalsIndex in req.body[0].signals)
            {
                if (req.body[0].signals[signalsIndex].UUID === 'temperature')
                {
                    for (logIndex in req.body[0].signals[signalsIndex].logs) {
                        json = {
                            UUID: req.body[0].signals[signalsIndex].UUID,
                            temp: req.body[0].signals[signalsIndex].logs[logIndex].value,
                            timestamp: Date.parse(req.body[0].signals[signalsIndex].logs[logIndex].date)
                        };

                        info = await attachToTangle(json, existingProduct.mamState);

                        await Product.updateOne({_id: existingProduct._id}, {
                            mamState: info.state
                        });
                    }

                } else if (req.body[0].signals[signalsIndex].UUID === 'positionDOTS') {
                    for (logIndex in req.body[0].signals[signalsIndex].logs) {
                        json = {
                            UUID: req.body[0].signals[signalsIndex].UUID,
                            lat: req.body[0].signals[signalsIndex].logs[logIndex].value.lat,
                            lon: req.body[0].signals[signalsIndex].logs[logIndex].value.lng,
                            timestamp: Date.parse(req.body[0].signals[signalsIndex].logs[logIndex].date)
                        };

                        info = await attachToTangle(json, existingProduct.mamState);

                        await Product.updateOne({_id: existingProduct._id}, {
                            mamState: info.state
                        });
                    }
                }
            }
        }

        response = {message: info};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
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
    const { userId, deviceID, productName } = req.body;
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

        existingProduct = await Product.findOne({device_id: deviceID});

        if (!existingProduct) {
            throw new Error('Nenhum produto cadastrado com esse ID!');
        }

        await Product.updateOne({_id: existingProduct._id}, {
            user_id: userId,
            name: productName
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

        product = await Product.findOne({_id: productId}, {user_id: 1, first_root: 1, name: 1});

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