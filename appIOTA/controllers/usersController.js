const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getAll = async (req, res) => {
    res.send('API do usuário');
};

const add = async (req, res) => {
    const { email, name, password } = req.body;

    let existingUser, hashedpassword;
    let response = {};

    try {
        if(!email) {
            throw new Error('Email não pode ser nulo.');
        }

        existingUser = await User.findOne({email: email});

        if (existingUser) {
            throw new Error('Email já cadastrado.');
        }

        hashedpassword = await bcrypt.hash(password, 12);

        const createdUser = new User({
            name: name,
            email: email,
            password: hashedpassword
        });

        await createdUser.save();

        response = {status: 200, message: 'Cadastrado com sucesso!'};
    } catch (err) {
        response = {status: 500, message: err.message};
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
            status: 200, 
            message: 'Login realizado com sucesso!',
            userId: existingUser.id,
            userName: existingUser.name
        };
    } catch (err) {
        response = {status: 500, message: err.message};
    }

    res.json(response);
}

exports.getAll = getAll;
exports.add = add;
exports.login = login;