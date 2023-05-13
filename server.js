'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

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
    const formattedData = cityData.data.map((obj) => new Forecast(obj));

    response.status(200).send(formattedData);
  } catch (error) {
    next(error);
  }
});

app.get('/movies', getMovies);

async function getMovies(request, response, next) {
  try {
    const { movieQuery } = request.query;

    const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;

    const movieResponse = await axios.get(url);
    const formattedData = movieResponse.data.results.map(
      (movie) => new Movie(movie)
    );

    response.status(200).send(formattedData);
  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(obj) {
    (this.title = obj.title),
      (this.overview = obj.overview),
      (this.avgVotes = obj.vote_average),
      (this.totalVotes = obj.vote_count),
      (this.imgUrl = obj.poster_path),
      (this.popularity = obj.popularity),
      (this.released = obj.released_on);
  }
}

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
