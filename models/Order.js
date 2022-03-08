const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Order = sequelize.define('order', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grade: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    },
    messenger: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    },
    orderDate: {
        type: DataTypes.DATE
    },
    subjects: {
        type: DataTypes.TEXT
    }
});
module.exports = Order;