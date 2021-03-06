const { DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../utils/database');
const Category = require('./category');
const TargetGroup = require('./target_group');

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
  },
  main_img: {
    type: DataTypes.STRING,
  },
  product_imgs: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
  // category_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: Category
  //   },
  //   key: 'id'
  // },
  // target_group_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: TargetGroup
  //   },
  //   key: 'id'
  // }
  // ,
  // category: {
  //   type: DataTypes.ENUM('t-shirts', 'shirts', 'pants', 'shoes'),
  //   allowNull: false
  // }
});

module.exports = Product;