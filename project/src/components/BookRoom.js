import React from 'react';
import './Bookings.css';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

class BookRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='root'>
        <p>Book a room</p>
        <Button color="inherit" component={Link} to="/bookings">Confirm Booking</Button>
      </div>
    )
  }
}

export default BookRoom;
