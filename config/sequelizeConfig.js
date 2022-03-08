const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('school', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;