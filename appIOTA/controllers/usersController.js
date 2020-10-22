const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getAll = async (req, res) => {
    res.send('API do usuário');
};

const add = async (req, res) => {
    const { email, name, password, type } = req.body;

    let existingUser, hashedpassword;
    let response = {};

    try {
        if(!email || !name || !password || !type) {
            throw new Error('Preencha todos os campos!');
        }

        existingUser = await User.findOne({email: email});

        if (existingUser) {
            throw new Error('Email já cadastrado.');
        }

        hashedpassword = await bcrypt.hash(password, 12);

        const createdUser = new User({
            name: name,
            email: email,
            password: hashedpassword,
            type: type
        });

        await createdUser.save();

        response = {message: 'Cadastrado com sucesso!'};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    res.json(response);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    let response = {};

    try {
        existingUser = await User.findOne({email: email});

        if(!existingUser) {
            throw new Error('Credenciais Erradas');
        }

        if(!(await bcrypt.compare(password, existingUser.password))) {
            throw new Error('Credenciais Erradas');
        }

        response = { 
            message: 'Login realizado com sucesso!',
            userId: existingUser.id,
            userName: existingUser.name
        };
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    res.json(response);
}

exports.getAll = getAll;
exports.add = add;
exports.login = login;