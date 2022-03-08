const Order = require("../models/Order");
const bot = require('../App/TelegramBot');
const botConfig = require("../config/telegramBotConfig");

// ТУДУ Валидация
exports.orderCreate = async (req, res) => {
    if(req.body.name && req.body.grade && req.body.messenger && req.body.orderDate && req.body.selectedSubjects && req.body.phone) {
        const order = await Order.create({
            name: req.body.name,
            grade: req.body.grade,
            messenger: req.body.messenger,
            orderDate: req.body.orderDate,
            subjects: req.body.selectedSubjects,
            phone: req.body.phone
        });
        await bot.telegram.sendMessage(botConfig.sender, `
            Новая заявка на консультацию ${order.orderDate}\n
            от ${order.name}, класс: ${order.grade}, место консультации: ${order.messenger}\n
            телефон: ${order.phone}
        `);
        res.status(200).json(order);
    }else{
        res.status(200).json({message: "Есть пустые поля формы!", error: true});
    }
}

exports.list = async (req, res) => {
    const list = await Order.findAll();
    res.status(200).json(list);
}

exports.order = async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if(order){
        res.status(200).json(order);
    }else{
        res.status(200).json({message: "Такого заказа не существует!", error: true})
    }
}
