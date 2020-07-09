const fs = require('fs');
const { Sequelize } = require('sequelize');
const colors = require('colors');
const dotenv = require('dotenv');

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

// DB CONNECT
// const sequelize = require('./utils/database');
// const sequelize = new Sequelize(process.env.PSQL_DATABASE, process.env.PSQL_USERNAME, process.env.PSQL_PASSWORD, {
//   host: process.env.PSQL_HOST,
//   dialect: 'postgres'
// });

// LOAD MODELS
const Product = require('./models/product');

// READ JSON FILES
const products = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'));

// IMPORT INTO DB
const importData = async () => {
  try {
    await Product.bulkCreate(products);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// DELETE FROM DB
const deleteData = async () => {
  try {
    await Product.destroy({ where: {} });
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}