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
  const { dataList } = request.query;
  console.log(dataList);

  try {
    // const description = weatherData[0].data[0].weather.description;
    // const date = weatherData[0].data[0].valid_date;

    if (dataList === 'Broken clouds') {
      const formattedData = weatherData.data[0].map((obj) => new Forecast(obj));
      console.log(formattedData);
      response.status(200).send(formattedData);
    } else if (dataList === 'Light rain') {
      const formattedData = weatherData.data[1].map((obj) => new Forecast(obj));
      console.log(formattedData);
    } else {
      response.status(404).send('Error no data');
    }
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
