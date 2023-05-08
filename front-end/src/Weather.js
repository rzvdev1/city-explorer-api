import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
    };
  }

  clickBtn = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/weatherData`;
      const response = await axios.get(url);
      this.setState({ weatherData: response.data }, () =>
        console.log(this.state.weatherData)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  clickItem = () => console.log('clicked');
  render() {
    return (
      <>
        <p>Weather data</p>
        <Button onClick={this.clickBtn}>Click!</Button>

        {this.state.weatherData.length > 0 &&
          this.state.weatherData.map((item) => (
            <>
              <p>{item}</p>
            </>
          ))}
      </>
    );
  }
}

export default Weather;
