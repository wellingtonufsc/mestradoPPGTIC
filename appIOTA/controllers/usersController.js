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

const view = async (req, res) => {
    const { userId } = req.params;
    let user = [], response = {};

    try {
        if (!userId) {
            throw new Error('ID do usuário inválido');
        }

        user = await User.findOne({_id: userId}, {name: 1});

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        response = {user: user};
        res.status(200);
    } catch (err) {
        response = {message: err.message};
        res.status(500);
    }

    res.json(response);
}

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
            userName: existingUser.name,
            userType: existingUser.type
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
exports.view = view;
exports.login = login;