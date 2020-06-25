// const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');


// LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

const app = express();

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('HELLO WORLD'));


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT} on mode ${process.env.NODE_ENV}`);
});