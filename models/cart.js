const { Sequelize } = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: true
  }
})

module.exports = Cart;