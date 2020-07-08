const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
});

Product.sync()
  .then(() => {
    console.log('CREATED products TABle');
  });

module.exports = Product;