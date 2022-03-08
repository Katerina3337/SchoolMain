const User = require('../models/User.js');
const jwt = require("jsonwebtoken");
const path = require('path');
const salt = require('../config/key');
const { createHmac } = require('crypto');

exports.home = (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname +'/../views/index.html'))
}

exports.test = (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname +'/../views/index1.html'))
}

exports.login = async (req, res) => {
    const hash = createHmac('sha256', req.body.password).digest('hex');
    const users = await User.findAll({
        where: {
            email: req.body.email
        }
    });
    const user = users[0]
    if(user && (user.password === hash)){
        let token = jwt.sign({ user }, salt.key);
        res.status(200).send(token);
    }else{
        res.status(200).send(false);
    }
}