const User = require('../models/User.js');
const { createHmac } = require('crypto');


exports.createUser = async (req, res) => {
    if(req.body.password === req.body.password_repeat){
        const hash = createHmac('sha256', req.body.password).digest('hex');
        const user = await User.create({ name: req.body.name, email: req.body.email, password: hash });
        res.status(200).json(user);
    }
}

exports.users = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
}

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.body.id);
    if(user){
        await user.destroy();
        res.status(200).send(true);
    }else{
        res.status(200).json({message: "Пользователь не существует!", error: true});
    }
}