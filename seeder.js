const fs = require('fs');
const colors = require('colors');

const sequelize = require('./utils/database');

// LOAD MODELS
const Product = require('./models/product');
const Category = require('./models/categories');

// READ JSON FILES
const products = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8'));

// RELATIONS
Category.hasMany(Product);
Product.belongsTo(Category);

// IMPORT INTO DB
const importData = async () => {
  try {
    await sequelize.sync({ force: true }).then(() => {
      console.log('SYNC WAS SUCCESSFUL'.green.inverse);
    });
    await Category.bulkCreate(categories);
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
    await Product.drop();
    await Category.drop();
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