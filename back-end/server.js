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

//render-app-name/weatherData
app.get('/weatherData', (request, response, next) => {
  try {
    const { searchQuery } = request.query;
    const cityData = weatherData.find((city) => city.city_name === searchQuery);
    const formattedData = cityData.data.map((obj) => {
      return new Forecast(obj);
    });

    response.status(200).send(formattedData);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(Obj) {
    this.date = Obj.valid_date;
    this.description = Obj.weather.description;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not Found');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(` listening on ${PORT}`));
