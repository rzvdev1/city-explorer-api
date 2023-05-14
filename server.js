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

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&&query=${movieQuery}`;

    // const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;
    //`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false

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
    this.title = obj.title;
    this.overview = obj.overview;
    this.images_url = obj.poster_path;
    this.average_votes = obj.vote_average;
    this.total_votes = obj.vote_count;
    this.popularity = obj.popularity;
    this.released_on = obj.release_date;
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
