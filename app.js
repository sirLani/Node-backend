require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');
// const httpClient = require('http');

const app = express();

//db

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERROR', err));

// middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//load routes
app.use('/api/v1', routes);

//404
app.all('*', (req, res) => {
  return res.status(404).json({ message: '#NOT_FOUND 😒😒😒' });
});

module.exports = app;
