'ues strict';

const axios = require('axios');
const cache = require('./cache');

function getMovies(request, response, next) {
  // try {
  //   const { movieQuery } = request.query;
  //   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&&query=${movieQuery}`;
  //   // const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;
  //   //`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false
  //   const movieResponse = await axios.get(url);
  //   const formattedData = movieResponse.data.results.map(
  //     (movie) => new Movie(movie)
  //   );
  //   response.status(200).send(formattedData);
  // } catch (error) {
  //   next(error);
  // }
  const movieQuery = request.query.movieQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`;

  const key = 'movie' + movieQuery;

  if (cache[key] && Date.now() - cache[key].timestamp < 60000) {
    console.log('Cache hit --- sending data from cache');
  } else {
    console.log('Cache miss --- making new request to the API');
    axios
      .get(url)
      .then((res) => res.data.results.map((movie) => new Movie(movie)))
      .then((formattedData) => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        // console.log(cache[key].data);
        response.status(200).send(formattedData);
      })
      .catch((err) => next(err));
  }
  //${process.enc.MOVIE_API_KEY}/movies?movieQuery=${this.state.city}
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

module.exports = getMovies;
