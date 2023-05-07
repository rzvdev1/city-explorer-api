'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  console.log(request.query);
  response.status(200).send('Route up and running');
});

app.get('/weatherData', (request, response) => {
  response.status(200).send(weatherData);
});

app.listen(PORT, () => console.log(` listening on ${PORT}`));
