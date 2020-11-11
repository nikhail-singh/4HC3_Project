import React from 'react';
import './Bookings.css';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='root'>
        <p>Bookings</p>
        <Button color="inherit" component={Link} to="/book-room">Book a room</Button>

      </div>
    )
  }
}

export default Bookings;
