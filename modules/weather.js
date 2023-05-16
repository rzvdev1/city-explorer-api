'ues strict';

const axios = require('axios');

function getWeather(request, response, next) {
  const searchQuery = request.query.searchQuery;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=5&units=I`;
  console.log(url);
  axios
    //   const cityData = weatherData.find((city) => city.city_name === searchQuery);
    //   const formattedData = cityData.data.map((obj) => new Forecast(obj));
    .get(url)
    .then((res) => res.data.data.map((obj) => new Forecast(obj)))
    .then((formattedData) => response.status(200).send(formattedData))
    .catch((err) => next(err));
}

class Forecast {
  constructor(Obj) {
    this.date = Obj.valid_date;
    this.description = Obj.weather.description;
    this.highTemp = Obj.max_temp;
    this.lowTemp = Obj.low_temp;
  }
}

module.exports = getWeather;
