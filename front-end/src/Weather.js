import React from 'react';
import { Button } from 'react-bootstrap';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
    };
  }

  clickItem = () => console.log('clicked');
  render() {
    return (
      <>
        <p>Weather data</p>
        <Button onClick={this.clickItem}>Click!</Button>
      </>
    );
  }
}

export default Weather;
