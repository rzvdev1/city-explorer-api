'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const getMovies = require('./modules/movies');

// const weatherData = require('./data/weather.json');

// const weather = require('./modules/weather');
const getWeather = require('./modules/weather');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  console.log(request.query);
  response.status(200).send('Route up and running');
});

//render-app-name/weatherData
app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('Not Found');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(` listening on ${PORT}`));
