// const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// const sequelize = require('./utils/database');

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

// ROUTE FILES
const products = require('./routes/products');

const app = express();

// BODY PARSER
app.use(express.json());

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ENABLE CORS
app.use(cors());

// MOUNT ROUTES
app.use('/api/v1/products', products);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT} on mode ${process.env.NODE_ENV}`);
});

//HANDLE UNHANDELED PROMISE REJECTIONS
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`);
  //CLOSE SERVER & EXIT PROCESS
  server.close(() => process.exit(1));
});