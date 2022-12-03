require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const { readdirSync } = require('fs');
const routes = require('./routes/index');

// const morgan = require('morgan');

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

// autoload routes
// readdirSync('./routes').map((r) =>
//   app.use('/api/v1', require(`./routes/${r}`))
// );
app.use('/api/v1', routes);

app.all('*', (req, res) => {
  return res.status(404).json({ message: '#NOT_FOUND 😒😒😒' });
});
module.exports = app;
