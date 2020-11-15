import React from 'react';
import './Bookings.css';
import { Button, Container, Typography } from '@material-ui/core';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={{textAlign: 'center'}}>
        <Typography align="center" variant='h2' gutterBottom>Future Meetings</Typography>
        <Button className='member-action' gutterBottom>Book a Meeting</Button>
        <Typography align="center" variant='body2' gutterBottom >See all of your future bookings below. To modify a booking, click the pencil icon. To delete a booking. select the trash can icon.</Typography>
      </Container>
    )
  }
}

export default Bookings;
