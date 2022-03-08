const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 80;
const verifyToken = require('./middleware/auth');
const validation = require("./middleware/validation");
const bot = require('./App/TelegramBot');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));

/**
 * Маршрутизация сервера
 **/

const appController = require('./Controllers/AppController');
const userController = require('./Controllers/UserController');
const orderController = require('./Controllers/OrderController');


app.get('/', appController.home)
app.get('/test', appController.test);
app.post('/login', appController.login);

app.get('/users', verifyToken,  userController.users);
app.post('/create-user', validation.createUserValidation, userController.createUser);
app.post('/delete-user', verifyToken, userController.deleteUser);

app.get('/order/:id', verifyToken, orderController.order)
app.get("/orders/list", verifyToken, orderController.list);
app.post('/order/create', orderController.orderCreate);

/**
 * Обработчики чат бота
 **/
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

/**
 * Обработчик ошибок валидации
 **/
app.use(validation.validationErr);
