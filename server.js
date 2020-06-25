// const path = require('path');
const express = require('express');
const dotenv = require('dotenv');


// LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => res.send('HELLO WORLD'));


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});