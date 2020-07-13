const { DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
  // ,
  // category: {
  //   type: DataTypes.ENUM('t-shirts', 'shirts', 'pants', 'shoes'),
  //   allowNull: false
  // }
});

module.exports = Product;